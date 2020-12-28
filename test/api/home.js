import req from '@/utils/request.js'
	
export let login=(data)=>{
	return req({
		url:'/user.login'
	})
}