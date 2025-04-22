'use server';

/**
 * Nodemailerを使用してマジックリンクメールを送信するユーティリティ
 */

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

/**
 * メール送信用のトランスポーターを取得する関数
 * gmailを使用してメールを送信するための設定を行います
 */
function getTransporter(): Transporter {

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || ''
    }
  });
}

/**
 * メールを送信する関数
 */
export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html: string
): Promise<{ success: boolean }> {
  const mailTransporter = getTransporter();

  const message = {
    to,
    from: process.env.EMAIL_FROM || 'no-reply@example.com',
    subject,
    text,
    html,
  };

  try {

    // 実際のメール送信
    const info = await mailTransporter.sendMail(message);
    console.log('メール送信成功:', info.messageId);

    return { success: true };
  } catch (error) {
    console.error('メール送信エラー:', error);
    throw new Error('メール送信に失敗しました');
  }
}

/**
 * マジックリンクのメールを送信
 */
export async function sendMagicLinkEmail(
  email: string,
  token: string
): Promise<{ success: boolean }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const loginLink = `${baseUrl}/auth/verify?token=${token}`;

  const subject = 'ログインリンク';

  const text = `
以下のリンクをクリックしてログインしてください。
このリンクは15分間有効です。

${loginLink}

このメールにお心当たりがない場合は無視してください。
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>ログインリンク</title>
  <style>
    body { font-family: sans-serif; line-height: 1.5; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; padding: 10px 20px; background-color: #4CAF50; 
      color: white; text-decoration: none; border-radius: 4px; }
    .footer { margin-top: 30px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <h1>ログインリンク</h1>
    <p>以下のボタンをクリックしてログインしてください。このリンクは15分間有効です。</p>
    <p><a href="${loginLink}" class="button">ログインする</a></p>
    <p>もしボタンが機能しない場合は、以下のURLをブラウザに貼り付けてください：</p>
    <p>${loginLink}</p>
    <div class="footer">
      <p>このメールにお心当たりがない場合は無視してください。</p>
    </div>
  </div>
</body>
</html>
`;

  return sendEmail(email, subject, text, html);
}