const openingStatements = [
	{'header':'See My Vision','subtext' : 'View Gallery'},
	{'header':'Let\'s Collab', 'subtext' : 'Learn More'}
];
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
////show opening box
function showOpeningText() {
	$('#box').show('fade',1500,'ease');
}
//handler for openingText functions
function alterOpeningText (){
	// reset statementIndex to 0 if at end of openingStatements, increment if not
	statementIndex = (statementIndex == openingStatements.length - 1) ? 0: statementIndex + 1;
	hideOpeningText();
	// Wait a bit and show updated text
	setTimeout(()=> {
		setOpeningText(openingStatements[statementIndex]['header'],openingStatements[statementIndex]['subtext']);
		showOpeningText();
	},1500);
}

	//change opening text every 9secs
	setInterval(alterOpeningText,9000)
$(window).on('load', () => {


});
