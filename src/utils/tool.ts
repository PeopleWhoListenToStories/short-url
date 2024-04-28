import * as  base62 from "base62/lib/ascii";

/**
 * @description 生成随机字符串
 * @param len 生成随机字符串的长度
 * @returns 
 */
export function generateRandomStr(len: number) {
    let str = '';
    for(let i = 0; i < len; i++) {
        const num = Math.floor(Math.random() * 62);
        str += base62.encode(num);
    }
    return str;
}