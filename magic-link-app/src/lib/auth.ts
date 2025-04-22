'use server';

import { TokenData, SessionData } from '@/types/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * DBの代わりにメモリ上でトークンを管理するユーティリティ
 * 注意: 本番環境では実際のDBを使用してください
 */

// メモリ内ストレージ (実際の実装ではDBを使用)
const sessionStore = new Map<string, SessionData>();

// トークンの有効期限 (15分)
const TOKEN_EXPIRY = 15 * 60 * 1000;

/**
 * 新しいトークンを生成して保存
 */
export async function createToken(email: string): Promise<string> {
  // ランダムなトークンを生成
  const token = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const user = await prisma.user.upsert({
    where: { email },
    create: {
      email
    },
    update: {}
  })

  // トークンをメールアドレスと紐付けて保存
  await prisma.token.create({
    data: {
      userId: user.id,
      token,
      createdAt: new Date()
    }
  });

  // 有効期限後に自動的に削除するタイマーを設定
  // setTimeout(async () => {
  //   await prisma.token.deleteMany({
  //     where: {
  //       token,
  //     }
  //   });
  // }, TOKEN_EXPIRY);

  return token;
}

/**
 * トークンが有効かチェックし、関連するメールアドレスを取得
 */
export async function validateToken(token: string): Promise<string | null> {

  const data = await prisma.token.findUnique({
    where: {
      token
    }
  });

  console.log('Token data:', data);
  if (!data) {
    return null; // トークンが存在しない
  }

  const isExpired = Date.now() - data.createdAt.getTime() > TOKEN_EXPIRY;

  if (isExpired) {

    return null;
  }

  return data.userId;
}

/**
 * ユーザーセッションを作成
 */
export async function createSession(id: string): Promise<string> {
  const sessionId = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  await prisma.session.create({
    data: {
      userId: id,
      sessionId: sessionId,
    }
  });


  // セッションクッキーを設定
  (await cookies()).set({
    name: 'session_id',
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // 1週間の有効期限
    maxAge: 7 * 24 * 60 * 60
  });

  return sessionId;
}

/**
 * セッションの有効性を確認
 */
export async function validateSession(sessionId: string): Promise<string | null> {
  const session = await prisma.session.findUnique({
    where: {
      sessionId
    }
  })
  return session ? session.userId : null;
}

/**
 * 現在のユーザーが認証されているか確認
 */
export async function getCurrentUser(): Promise<string | null> {
  const cookie = await cookies();

  const sessionId = cookie.get('session_id')?.value;

  if (!sessionId) {
    return null;
  }

  return validateSession(sessionId);
}

/**
 * セッションを削除（ログアウト）
 */
export async function deleteSession(): Promise<void> {
  const cookie = await cookies();
  const sessionId = cookie.get('session_id')?.value;

  if (sessionId) {
    sessionStore.delete(sessionId);
    cookie.delete('session_id');
  }
}

/**
 * 認証が必要なルートのチェック用
 */
export async function requireAuth(): Promise<string> {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return user;
}
