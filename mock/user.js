export default [
	{
		type: 'post',
		url: '/api/user/login',
		response: () => {
			return {
				accessToken: 'accessToken',
				refreshToken: 'refreshToken',
				refreshTime: new Date().getTime() + 24 * 60 * 60 * 1000
			}
		}
	},
	{
		type: 'post',
		url: '/api/user/refreshToken',
		response: () => {
			return {
				accessToken: 'accessToken',
				refreshToken: 'refreshToken',
				refreshTime: new Date().getTime() + 24 * 60 * 60 * 1000
			}
		}
	},
	{
		type: 'get',
		url: '/api/user',
		response: () => {
			return {
				id: '1111',
				name: 'admin',
				headIcon: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
				permissions: ['admin']
			}
		}
	},
	{ 
    type: 'post',
    url: '/api/user/logout',
    response: () => { }
  }
]