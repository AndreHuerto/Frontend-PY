import React, { Component, Fragment } from "react";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";
import SinglePagePDFViewer from "../../../components/pdf/single-page";

class Documento extends Component {
  render() {
    console.log("renderizando");
    return (
      <Fragment>
        <form onSubmit={this.props.handleOnUpdate} className="flex flex-col">
          <label
            htmlFor="file-input"
            className="bg-gray-300 w-40 h-48 rounded-2xl flex items-center justify-center"
          >
            <Add className="cursor-pointer"></Add>
            <input
              id="file-input"
              type="file"
              className="hidden"
              onChange={this.props.onChange}
            />
          </label>
          <button
            className={`text-center w-40 border rounded-xl bg-upeu-3 text-white focus:outline-none p-1
                              ${
                                this.props.doc_bases &&
                                this.props.doc_guia &&
                                this.props.doc_req
                                  ? ""
                                  : "disabled:opacity-50"
                              }
                              `}
            type="submit"
            disabled={
              this.props.doc_bases === null ||
              this.props.doc_guia === null ||
              this.props.doc_req === null
            }
          >
            Enviar
          </button>
        </form>
      </Fragment>
    );
  }
}

const listOfDocument = (props) => {
  return (
    <div className="flex flex-col flex-wrap sm:flex-row">
      {props.doc_bases && (
        <>
          <a
            target="_blank"
            href={props.doc_bases}
            rel="noopener noreferrer"
            className="w-36 text-center"
          >
            <img src={props.imagePdf} alt="" />
            Bases del concurso
          </a>
        </>
      )}
      {props.doc_guia && (
        <a
          target="_blank"
          href={props.doc_guia}
          rel="noopener noreferrer"
          className="w-36 text-center"
        >
          <img src={props.imagePdf} alt="" />
          <span>Guia del concurso</span>
        </a>
      )}

      {props.doc_req && (
        <a
          target="_blank"
          href={props.doc_req}
          rel="noopener noreferrer"
          className="w-36 text-center"
        >
          <img src={props.imagePdf} alt="" />
          Evaluacion del concurso
        </a>
      )}
      {/* {props.file && <SinglePagePDFViewer pdf={props.preview} />} */}
    </div>
  );
};

Documento.list = listOfDocument;
export default Documento;
