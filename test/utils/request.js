let baseUrl = ''
let env ='prod'
switch (env) {
	// dev对应的appid:wxcfdb1d66938a2a6e
  case 'dev':
    baseUrl = 'https://demoshop.ccdental.cn/index.php/topapi'
    break
  case 'prod':
    baseUrl = 'https://shop.ccdental.cn/index.php/topapi'
    break
  default:
    break
}
export default function req (data) {
	return new Promise((resolve, reject) => {
		wx.request({
			url: baseUrl + data.url,
			method: data.method || 'GET',
			data: data.data || {},
			header: {
				'Content-Type': data.method==='POST'?'application/x-www-form-urlencoded':'application/json',
				Authorization:  `Bearer ${wx.getStorageSync('token')}`
			},
			success: res => {
				console.log(res)
				// if (res.data.code === 'S0001') {
				// 	wx.removeStorage({
				// 		key: 'token'
				// 	})
				// 	wx.showToast({
				// 		title: '登录超时，即将跳转登录页面',
				// 		icon: 'none',
				// 		duration: 1300,
				// 		success: () => {
				// 			wx.reLaunch({
				// 				url: '/pages/login/index'
				// 			})
				// 			console.log('打印了')
				// 		}
				// 	})
				// } else {
				// 	resolve(res)
				// }
			},
			fail: res => {
				if (res.errMsg.includes('timeout')) {
					wx.showToast({
						title: '网络超时',
						icon: 'none'
					})

				} else {
					wx.showToast({
						title: '网络错误',
						icon: 'none'
					})
				}

				reject(res)
			},
			complete: res => {}
		})
	})
}
