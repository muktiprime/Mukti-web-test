import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { tawkToLoadScripts } from '../utils/tawkTo';

export default function LiveChat() {
	let location = useLocation();

	window.Tawk_API = window.Tawk_API || {}
	window.Tawk_LoadStart = new Date();

	useEffect(() => {
		tawkToLoadScripts()
		window.Tawk_API.onLoad = function () {
			//console.log("chat loaded");
			window.Tawk_API.setAttributes(
			  {
				
			  },
			  function (error) {
				//console.log("window.Tawk_API errorr",error)
			  }
			);
		};
		window.Tawk_API.onChatMaximized = function(){
			//place your code here
			//console.log("chat onChatMaximized");
	  
			const page_path = location.pathname + location.search;
			window.Tawk_API.addEvent('current-path', {
			  'path'    : page_path,
		  }, function(error){
		   // console.log("window.Tawk_API errorr",error)
		  });}
	}, [])
	return <></>
}
