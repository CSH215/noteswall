export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const path = url.pathname;

        // 处理 CORS
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS, fetch',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };

        if (request.method === 'GET' && path === '/') {
            return new Response('Noteswall API is running!', {
                headers: { 'Content-Type': 'text/plain' }
            });
        }

        // 处理预检请求
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // 获取消息列表
        if (request.method === 'GET' && path === '/api/messages') {
            try {
                const messages = await env.MESSAGES_STORE.get('messages');
                const messagesArray = messages ? JSON.parse(messages) : getDefaultMessages();

                return new Response(JSON.stringify(messagesArray), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: 'Failed to fetch messages' }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            }
        }

        // 更新消息列表
        if (request.method === 'PUT' && path === '/api/messages') {
            try {
                const authHeader = request.headers.get('Authorization');
                if (!authHeader || !isValidToken(authHeader)) {
                    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                        status: 401,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    });
                }

                const messages = await request.json();
                await env.MESSAGES_STORE.put('messages', JSON.stringify(messages));

                return new Response(JSON.stringify({ success: true }), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: 'Failed to update messages' }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            }
        }

        // 获取颜色列表
        if (request.method === 'GET' && path === '/api/colors') {
            try {
                const colors = await env.MESSAGES_STORE.get('colors');
                const colorsArray = colors ? JSON.parse(colors) : getDefaultColors();

                return new Response(JSON.stringify(colorsArray), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: 'Failed to fetch colors' }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            }
        }

        // 更新颜色列表
        if (request.method === 'PUT' && path === '/api/colors') {
            try {
                const authHeader = request.headers.get('Authorization');
                if (!authHeader || !isValidToken(authHeader)) {
                    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                        status: 401,
                        headers: {
                            'Content-Type': 'application/json',
                            ...corsHeaders
                        }
                    });
                }

                const colors = await request.json();
                await env.MESSAGES_STORE.put('colors', JSON.stringify(colors));

                return new Response(JSON.stringify({ success: true }), {
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            } catch (error) {
                return new Response(JSON.stringify({ error: 'Failed to update colors' }), {
                    status: 500,
                    headers: {
                        'Content-Type': 'application/json',
                        ...corsHeaders
                    }
                });
            }
        }

        // 404 处理
        return new Response('Not Found', { status: 404 });
    }
};

// 默认消息列表
function getDefaultMessages() {
    return [
        '保持好心情',
        '多喝水哦',
        '今天辛苦啦！',
        '早点休息',
        '记得吃水果',
        '加油，你可以的',
        '祝你顺利',
        '保持微笑呀',
        '愿所有烦恼都消失',
        '期待下一次见面',
        '梦想总会实现',
        '天气冷了，多穿衣服',
        '记得给自己放松',
        '每天都要元气满满',
        '今天也要好好爱自己',
        '适当休息一下',
        '今天要开心',
        '每天发大财！',
        '你知道 Hello World 很伟大的',
        '不用迷茫，时间会给你答案',
        '莫向外求，但从心觅；行有不得，反求诸己。',
        '不要被别人限制，不要被别人所 Expect',
        '我觉君非池中物，咫尺蛟龙云雨。',
        '我已无计可施，无计可求。',
        '今日事，今日毕。'
    ];
}

// 默认颜色列表
function getDefaultColors() {
    return [
        '#FFCDD2', // 樱桃红
        '#F8BBD0', // 粉玫瑰
        '#E1BEE7', // 浅紫丁香
        '#D1C4E9', // 薰衣草紫
        '#C5CAE9', // 天蓝
        '#BBDEFB', // 靛蓝
        '#B2EBF2', // 冰川蓝
        '#B2DFDB', // 海绿
        '#C8E6C9', // 薄荷绿
        '#DCEDC8', // 苹果绿
        '#FFF9C4', // 米黄
        '#FFECB3', // 金黄
        '#FFE082', // 黄油色
        '#FFCCBC', // 桃子橙
        '#EF9A9A', // 珊瑚红
        '#CE93D8'  // 紫罗兰
    ];
}

// 简单的 Token 验证
function isValidToken(authHeader) {
    const token = authHeader.replace('Bearer ', '');
    return token === '设置你自定义的字符串';
}
