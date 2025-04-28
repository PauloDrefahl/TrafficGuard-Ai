// Blue Title Headers found above each card

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
          padding: '10px',          
          height: '54px',
          maxWidth: '80%',
          margin: '18px', // External Margin
          
         

          // Text CSS
          color: 'white',
          fontFamily: 'Inter',
          fontSize: '30px',        
          display: 'flex',             // Center vertically
          justifyContent: 'center',    // Center horizontally 
          alignItems: 'center',        // Center vertically

        }}>

        {HeaderText} {/* Header Text for Card Header Prop */}

      </div>

    );

  }
  
  export default CardHeader;