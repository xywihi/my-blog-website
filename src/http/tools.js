
// 生成盐值
export function generateSalt(saltLength = 16) {
    return window.crypto.getRandomValues(new Uint8Array(saltLength))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

export async function createHash(password) {
    // 合并密码和盐值
    const data = new TextEncoder().encode(password);

    // 创建哈希对象
    return window.crypto.subtle.digest('SHA-256', data)
        .then(hashBuffer => {
            // 将ArrayBuffer转换为十六进制字符串
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        });
}

