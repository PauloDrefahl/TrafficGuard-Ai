import React from 'react';

const ScrollBoxRouter = ({

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
        overflow: 'hidden', // Ensures scroll + blur is clipped 
      }}
    >

      {/* Scrollable content area */}
      <div className="custom-scroll-router"

        style={{

          height: '100%',
          overflowY: 'auto',
          padding: '0px',

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
          right: '0px', /* So blur doesn't affect scrollbar */
          height: '40px',
          background: `linear-gradient(to bottom, #F0F0F0, transparent)`,
          pointerEvents: 'none',
          borderRadius: '15px',
          zIndex: 1,

        }}
      />

      {/* Bottom blur overlay */}
      <div

        style={{

          position: 'absolute',
          bottom: 0,
          left: 0,
          right: '0px', /* So blur doesn't affect scrollbar */
          height: '40px',
          background: `linear-gradient(to top, #F0F0F0, transparent)`,
          pointerEvents: 'none',
          borderRadius: '15px',
          zIndex: 1,

        }}
      />

    </div>
  );
};

export default ScrollBoxRouter;
