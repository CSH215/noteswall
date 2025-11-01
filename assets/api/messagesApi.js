// messagesApi.js

/**
 * 获取便签消息列表
 * @returns {Promise<Array>} 消息数组
 */
const getMessages = async () => {
    const options = {
        method: 'GET',
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://noteswall-api.example.com/api/messages", options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('获取消息列表失败:', error);
        throw error;
    }
};

/**
 * 更新便签消息
 * @param {Array} messages - 消息数组
 * @returns {Promise<Object>} 响应结果
 */
const updateMessages = async (messages) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer 你的密钥`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(messages);

    const putMessagesOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://noteswall-api.example.com/api/messages", putMessagesOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('更新消息失败:', error);
        throw error;
    }
};
