import React from 'react';

const ScrollBoxNotos = ({

  children,
  height = '500px',
  width = '94%',
  backgroundColor = '#F9F8F8',

}) => {

  return (

    <div

      style={{
        position: 'relative',
        height,
        width,
        marginLeft: '60px',
        marginTop: '20px',
        overflow: 'hidden', // Ensures scroll + blur is clipped 
      }}
    >

      {/* Scrollable content area */}
      <div className="custom-scroll"

        style={{

          height: '100%',
          overflowY: 'auto',
          padding: '20px',

        }}
      >

        {children}

      </div>

      {/* Top blur overlay */}
      <div

        style={{

          position: 'absolute',
          top: 0,
          left: 0,
          right: '20px', /* So blur doesn't affect scrollbar */
          height: '40px',
          background: `linear-gradient(to bottom, ${backgroundColor}, transparent)`,
          pointerEvents: 'none',
          zIndex: 1,

        }}
      />

      {/* Bottom blur overlay */}
      <div

        style={{

          position: 'absolute',
          bottom: 0,
          left: 0,
          right: '20px', /* So blur doesn't affect scrollbar */
          height: '40px',
          background: `linear-gradient(to top, ${backgroundColor}, transparent)`,
          pointerEvents: 'none',
          zIndex: 1,

        }}
      />

    </div>
  );
};

export default ScrollBoxNotos;
