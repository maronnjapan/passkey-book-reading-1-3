'use client'
import { verifyTokenAction } from "@/actions/auth";
import { useEffect, useState } from "react";

export function Verify({ token }: {
    token: string;
}) {
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const setCookie = async (): Promise<void> => {
            verifyTokenAction(token).then((result) => {
                console.log("トークン検証結果:", result);
                if (result.success) {
                    setError(undefined);
                    // 成功時はダッシュボードにリダイレクト
                    window.location.href = "/dashboard";
                } else {
                    // エラー時はエラーメッセージを表示
                    setError(result.error);
                }
            }
            ).catch((error) => {
                console.error("トークン検証エラー:", error);
                setError(error.message);
            }
            );
        };
        setCookie();
    }, [token])

    return (
        error ? (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-card">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">認証エラー</h1>
                        <p className="text-gray-500">ログインリンクの検証中に問題が発生しました</p>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
                        <div className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-medium text-red-800">エラー内容</h3>
                                <p className="mt-1 text-sm text-red-700">
                                    {error || 'ログインリンクが無効または期限切れです。もう一度ログインを試みてください。'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-600 text-sm">
                            以下の理由でエラーが発生した可能性があります：
                        </p>
                        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 ml-2">
                            <li>リンクの有効期限（15分）が切れています</li>
                            <li>リンクが既に使用されています</li>
                            <li>リンクが正しくコピーされていません</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <a
                            href="/"
                            className="block w-full text-center py-3 px-4 bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <div className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                                ログインに戻る
                            </div>
                        </a>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        問題が解決しない場合は、サポートにお問い合わせください。
                    </div>
                </div>
            </div>
        ) : null
    );
}