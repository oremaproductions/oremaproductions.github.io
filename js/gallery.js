const openingStatements = [
	{'header':'See My Vision','subtext' : 'View Gallery','link': 'gallery.html'},
	{'header':'Let\'s Collab', 'subtext' : 'Learn More', 'link' : 'collabs.html'}
];
let openingLink = 'gallery.html';
let statementIndex = 0;


//hide #box
function hideOpeningText() {
	$('#box').hide('fade',1500,'ease'); 
}


// once hidden, set opening text
function setOpeningText(header,subtext) {
	document.querySelector('#openingHeader').innerText = header;
	document.querySelector('#openingSubtext').innerText = subtext; 
}


function setOpeningLink(link) {
	return (document.querySelector('#box').dataset.target=link);
}


////show opening box
function showOpeningText() {
	$('#box').show('fade',1500,'ease');
}


//handler for openingText functions
function alterOpeningText (){
	// reset statementIndex to 0 if at end of openingStatements, increment if not
	statementIndex = (statementIndex == openingStatements.length - 1) ? 0: statementIndex + 1;
	hideOpeningText();
	// Wait a bit after hiding text and show updated text
	setTimeout(()=> {
		setOpeningText(openingStatements[statementIndex]['header'],openingStatements[statementIndex]['subtext']);
		setOpeningLink(openingStatements[statementIndex]['link']);
		showOpeningText();
	},1500);
}

	//change opening text every 9secs
	setInterval(alterOpeningText,9000);
	
$(window).on('load', () => {


});
