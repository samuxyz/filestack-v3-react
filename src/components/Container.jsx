import React, { Component } from 'react';

export default class Container extends Component {

  constructor (props) {
    super(props);
    this.state = { url: null, metadata: null };
  }

  setPicture = () => {
    this.uploadImage()
      .then(data => {
        const { url, handle } = data.filesUploaded[0];
        this.setState({ url });
        this.getMetadata(handle);
        console.log(JSON.stringify(data.filesUploaded));
      })
      .catch(err => console.log(err));
  }

  getMetadata = (handle) => {
    const { client } = this.props;
    client.metadata(handle)
      .then(metadata => this.setState({ metadata }))
      .catch(err => console.log(err));
  }

  uploadImage = () => {
    const { client } = this.props;
    return client.pick(
      {
        accept: 'image/*',
        maxSize: 1024 * 1024 * 2,
        transformOptions: {
          transformations: {
            rotate: true,
            circle: true,
            monochrome: true,
            sepia: true,
            crop: {
              aspectRatio: 16 / 9,
            },
          },
        },
      }
    );
  };

  render () {
    const { url, metadata } = this.state;
    return (
      <div className="container">
        <div className="page-header">
          <h1>Filestack V3 <small>in action</small></h1>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="thumbnail">
              <img
                className="img-responsive"
                src={url || 'http://placehold.it/800x600?text=Upload+a+Photo'}
              />
            </div>
            <div className="metadata">
              {metadata && JSON.stringify(metadata)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="text-center">
            <button
              type="button"
              className="btn btn-filestack"
              onClick={this.setPicture}
            >
              <i className="glyphicon glyphicon-upload" /> Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
