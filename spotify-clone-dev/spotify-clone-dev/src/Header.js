import React from 'react'
import "./Header.css"
import Avatar from '@mui/material/Avatar';
import {useDataLayerValue} from "./DataLayer" 
import SearchIcon from '@mui/icons-material/Search';

function Header() {

	const [{user},dispatch]=useDataLayerValue();
	return (
		<div className="header">
			<div className="header__left">
				<SearchIcon/>
				<input 
				   type="text"
				   placeholder="Search for Artists, Songs, or Podcasts "

				/>

			</div>
			<div className="header__rights">
				<Avatar src={user?.images[0]?.url} alt={user?.display_name}/>
				<h4>{user?.display_name}</h4>
			</div>
		</div>
	)
}

export default Header