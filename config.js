const config = {
    global: {
        title: 'Adkinsm Home',
        author: 'Adkinsm',
        description: 'A Student from China',
        nav: [
            { name: 'Home', link: '/' },
            { name: 'Posts', link: '/posts' },
            { name: 'Links', link: '/pages/links' },
            { name: 'About', link: '/pages/about' },
        ]
    },
    home: {
        banner: {
            typeWriter: [
                {
                    text: 'Front-end',
                },
                {
                    text: 'Developer',
                },
                {
                    text: '/',
                },
                {
                    text: 'Open',
                },
                {
                    text: 'Sourceror',
                },
                {
                    text: '/',
                },
                {
                    text: 'Blogger',
                },
                {
                    text: '/',
                },
                {
                    text: 'Android',
                },
                {
                    text: 'Player',
                },
            ]
        },
        properties: {
            title: '属性点全集',
            items: [
                {
                    title: '智力状况',
                    value: 40,
                    tip: '半痴呆（雾',
                },
                {
                    title: '精神状态',
                    value: 30,
                    tip: '某些时候有点抑郁的样子（？',
                },
                {
                    title: '脑细胞活跃度',
                    value: 10,
                    tip: '喜欢设计一些 shit',
                },
                {
                    title: '社交能力',
                    value: 20,
                    tip: '内向腼腆小男孩（bushi',
                },
            ]
        }
    },
    posts: {
        description: 'Some posts by Adkimsm, usually written in Chinese'
    }
}

export default config