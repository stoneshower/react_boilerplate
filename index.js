import './css/style.css';
//without this it would not generate style.css inside dist directory

import React from 'react';
import ReactDOM from 'react-dom';

const Index = React.createClass({
	render: function(){
		var listNames = this.props.names.map((name)=>
			<span>{name} </span>
		);
		var i = 0;
		return(
			<div key={i++}>
                <a href="#">{listNames}</a> 
			</div>
		)
	}
});

const All = React.createClass({
	render: function(){
		var items = ['John', 'Paul', 'George', 'Ringo'];
		return(
			<Index names={items}/>
		)
	}
});


ReactDOM.render(
	<All />,
	document.getElementById('app')
);