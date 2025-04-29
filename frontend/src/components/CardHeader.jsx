// Blue Title Headers found above each card
// Could make this into normal css 

function CardHeader({ HeaderText }) {

    return (

      // Card Header HTML
      <div

        // Card Header CSS
        style={{
          
          // Box CSS
          backgroundColor: '#3775F1',
          borderRadius: '10px',
          boxShadow: '0px 4px 4px rgb(0, 0, 0, .25)',
          padding: '10px 40px',          
          height: '54px',
          maxWidth: '80%',
          width: 'fit-content',
          margin: '18px 0px 18px 0px', // top, right, bottom, left; External Margin
          
          // Text CSS
          color: 'white',
          fontFamily: 'Inter',
          fontSize: '28px',        
          display: 'flex',             // Center vertically
          justifyContent: 'center',    // Center horizontally 
          alignItems: 'center',        // Center vertically

        }}>

        {HeaderText} {/* Header Text for Card Header Prop */}

      </div>

    );

  }
  
  export default CardHeader;