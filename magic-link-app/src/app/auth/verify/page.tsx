import { verifyTokenAction } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { Verify } from './Verify';

// マジックリンクトークンを検証するページ
export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  // URLからトークンを取得
  const token = searchParams.token;

  console.log('Token:', token);
  // トークンがない場合はホームページにリダイレクト
  if (!token) {
    redirect('/');
  }

  // トークンを検証

  // 失敗時（リダイレクトされなかった場合）のメッセージを表示
  // 成功時は自動的にダッシュボードにリダイレクトされる
  return <Verify token={token} />;
}
