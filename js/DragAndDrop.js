import React from 'react';

var DragAndDrop = function DragAndDrop(props) {
    var handleDragEnter = function handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    var handleDragLeave = function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    var handleDragOver = function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    var handleDrop = function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
    };
    return React.createElement(
        'div',
        { className: 'drag-drop-zone',
            onDrop: function onDrop(e) {
                return handleDrop(e);
            },
            onDragOver: function onDragOver(e) {
                return handleDragOver(e);
            },
            onDragEnter: function onDragEnter(e) {
                return handleDragEnter(e);
            },
            onDragLeave: function onDragLeave(e) {
                return handleDragLeave(e);
            }
        },
        React.createElement(
            'p',
            null,
            'Drag files here to upload'
        )
    );
};
export default DragAndDrop;