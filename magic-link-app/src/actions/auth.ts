'use server';

import { createToken, createSession, deleteSession, validateToken } from '@/lib/auth';
import { sendMagicLinkEmail } from '@/lib/email';
import { redirect } from 'next/navigation';

/**
 * マジックリンクを生成して送信するアクション
 */
export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return {
      success: false,
      error: '有効なメールアドレスを入力してください'
    };
  }

  try {
    // トークンを生成
    const token = await createToken(email);

    // マジックリンクメールを送信
    await sendMagicLinkEmail(email, token);

    return {
      success: true,
      message: 'マジックリンクメールを送信しました'
    };
  } catch (error) {
    console.error('ログインエラー:', error);
    return {
      success: false,
      error: 'マジックリンクの送信に失敗しました'
    };
  }
}

/**
 * マジックリンクのトークンを検証し、ログイン処理を行うアクション
 */
export async function verifyTokenAction(token: string) {
  try {
    // トークンを検証し、関連するメールアドレスを取得
    const id = await validateToken(token);

    // トークンが無効または期限切れの場合
    if (!id) {
      return {
        success: false,
        error: '無効なトークンです。もう一度ログインを試みてください。'
      };
    }

    // セッションを作成
    await createSession(id);

    return {
      success: true,
      error: undefined
    };
    // ダッシュボードページにリダイレクト
  } catch (error) {
    console.error('トークン検証エラー:', error);
    return {
      success: false,
      error: 'サーバーエラーが発生しました'
    };
  }
}

/**
 * ログアウトアクション
 */
export async function logoutAction() {
  try {
    await deleteSession();
    redirect('/');
  } catch (error) {
    console.error('ログアウトエラー:', error);
    return {
      success: false,
      error: 'ログアウト処理に失敗しました'
    };
  }
}
