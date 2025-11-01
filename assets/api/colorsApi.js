// colorsApi.js

/**
 * 获取便签颜色列表
 * @returns {Promise<Array>} 颜色数组
 */
const getColors = async () => {
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://noteswall-api.example.com/api/colors", options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('获取颜色列表失败:', error);
        throw error;
    }
};

/**
 * 更新便签颜色
 * @param {Array} colors - 颜色数组
 * @returns {Promise<Object>} 响应结果
 */
const updateColors = async (colors) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer 你的密钥`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(colors);

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://noteswall-api.example.com/api/colors", requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('更新颜色失败:', error);
        throw error;
    }
};
