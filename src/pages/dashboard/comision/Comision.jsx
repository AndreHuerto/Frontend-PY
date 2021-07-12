import Tabs from "../../../components/tab/Tabs";
import Documento from "./Documento";
import Select from "../../../components/select/Select";
import Faq from "../../../components/faq/Faq";
import TableTemplate from "../../../components/table/TableTemplate";
import { Concursos, LoadginConcurso } from "./Concursos";

import imagePdf from "../../../assets/icons/pdf.svg";
import flechabajo from "../../../assets/icons/flecha-abajo.svg";
import flecharriba from "../../../assets/icons/flecha-arriba.svg";

import UserService from "../../../auth/comision/user.service";

import "../../../styles/faq.css";

import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { pdfjs } from "react-pdf";
import { useHistory } from "react-router-dom";

const Comision = ({ user }) => {
  const history = useHistory();
  const [loadingC, setLoadingC] = useState(true);

  const [comision, setComision] = useState({
    idconcurso: null,
    Tipo: "",
    Participacion: "",
    Modalidad: "",
    doc_req: null,
    doc_bases: null,
    doc_guia: null,
    fecha_ini: undefined,
    fecha_fin: undefined,
    auxiliares: [],
    asociados: [],
    principales: [],
    file: "",
    preview: "",
    items: [
      { label: "Tipo", options: ["Ingreso", "Promoción"] },
      { label: "Modalidad", options: ["Publica", "Interna"] },
      {
        label: "Participacion",
        options: ["Mediante Invitación", "Iniciativa Propia"],
      },
    ],
    concursos: [],
  });

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    setLoadingC(true);
    getAllConcursos();
  }, []);
  const getAllConcursos = () => {
    UserService.getConcursos().then(
      (response) => {
        console.log(response);
        const { concurso } = response;
        // setConcursos(concurso);
        setComision((prevState) => ({
          ...prevState,
          concursos: concurso,
        }));
        setLoadingC(false);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const createConsurso = (e) => {
    e.preventDefault();
    UserService.createConcurso().then(
      (response) => {
        const { idconcurso } = response;
        if (idconcurso)
          setComision((prevState) => ({ ...prevState, idconcurso }));
        swal({
          title: "Creación Exitosa!",
          text: "Se ha creado un concurso",
          icon: "success",
          button: "Ok",
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setComision((prevState) => ({ ...prevState, file: undefined }));
      return;
    }
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      let data = new FormData();
      data.append("file", file);
      console.log(reader.result);
      setComision((prevState) => ({
        ...prevState,
        file: file,
        preview: reader.result,
      }));
      UserService.uploadFile(data).then(
        (response) => {
          const { webViewLink } = response;
          console.log(response);
          if (comision.doc_req === null) {
            setComision((prevState) => ({
              ...prevState,
              doc_req: webViewLink,
            }));
          } else if (comision.doc_req !== null && comision.doc_bases === null) {
            setComision((prevState) => ({
              ...prevState,
              doc_bases: webViewLink,
            }));
          } else {
            setComision((prevState) => ({
              ...prevState,
              doc_guia: webViewLink,
            }));
          }
          swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            button: "Aww yiss!",
          });
        },
        (error) => {
          console.error(error);
        }
      );
    };
    reader.readAsDataURL(file);
  };

  const handleOnUpdate = async (e) => {
    e.preventDefault();
    const data = {
      tipo_concurso: comision.Tipo,
      modalidad: comision.Modalidad,
      participacion: comision.Participacion,
      doc_req: comision.doc_req,
      doc_bases: comision.doc_bases,
      doc_guia: comision.doc_guia,
      fecha_ini: comision.fecha_ini || "",
      fecha_fin: comision.fecha_fin || "",
    };
    console.log(data);
    UserService.updateConcurso(JSON.stringify(data), comision.idconcurso).then(
      (response) => {
        console.log(response);
        swal({
          title: "Exitoso!",
          text: "Se guardo correctamente",
          icon: "success",
          button: "Ok",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onSendEmail = (e) => {
    e.preventDefault();
    const data = {
      idconcurso: comision.idconcurso,
      iddocentes: comision.auxiliares.map((docente) => docente.iddocente),
    };
    console.log(data);
    UserService.sendEmail(JSON.stringify(data)).then(
      (response) => {
        console.log(response);
        swal({
          title: "Enviado Correctamente!",
          text: "Se ha enviado notificación a los emails",
          icon: "success",
          button: "Ok",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const getAuxiliares = () => {
    UserService.getDocentesAuxiliares().then(
      (response) => {
        const { docentes } = response;
        if (docentes)
          setComision((prevState) => ({ ...prevState, auxiliares: docentes }));
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const getAsociados = () => {
    UserService.getDocentesAsociados().then(
      (response) => {
        const { docentes } = response;
        if (docentes)
          setComision((prevState) => ({ ...prevState, asociados: docentes }));
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const getPrincipales = () => {
    UserService.getDocentesPrincipales().then(
      (response) => {
        const { docentes } = response;
        if (docentes)
          setComision((prevState) => ({ ...prevState, principales: docentes }));
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const handleTerminar = (e) => {
    e.preventDefault();
    const data = {
      iddocente: user.id,
      id: comision.idconcurso,
    };
    console.log(data);
    swal({
      title: "¿Estas seguro de Finalizar?",
      text: "Una vez que acepte, se finalizara la configuración del concurso",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        UserService.confirmarConcurso(
          JSON.stringify(data),
          comision.idconcurso
        ).then(
          (response) => {
            console.log(response);
            swal("Configuración creada correctamente", {
              icon: "success",
            });
            history.push("/login");
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        swal("No se ha terminado configurado!");
      }
    });
  };

  const handleOnchangeSelect = (e) => {
    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
    setComision((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const {
    idconcurso,
    items,
    doc_bases,
    doc_guia,
    doc_req,
    preview,
    file,
    fecha_ini,
    fecha_fin,
    auxiliares,
    asociados,
    principales,
    selectedOption,
    concursos,
  } = comision;
  return (
    <>
      {concursos.length === 0 && idconcurso === null ? (
        <div className="mx-auto w-6/12 ">
          <h1 className="text-4xl my-7">
            Hola {user.nombre} no tienes concursos creados
          </h1>

          <form onSubmit={createConsurso}>
            <button
              type="submit"
              className="text-center focus:outline-none border p-2 bg-upeu-3 text-white rounded-xl"
            >
              Crear concurso
            </button>
          </form>
        </div>
      ) : idconcurso === null ? (
        <>
          {loadingC === true ? <LoadginConcurso/>
          : concursos.map((value, key) => (
            <section className="flex flex-wrap" key={key}>
                <Concursos
                  tipo={value.tipo_concurso}
                  modalidad={value.modalidad}
                  participacion={value.participacion}
                  fecha_ini={value.fecha_ini}
                  fecha_fin={value.fecha_fin}
                />
            </section>
          ))}


          <form onSubmit={createConsurso} className="flex justify-center">
            <button
              type="submit"
              className="text-center focus:outline-none border p-2 bg-upeu-3 sm:bg-upeu-3-100 text-white rounded-xl max-w-md transition duration-500 ease select-none hover:bg-upeu-3 focus:ring"
            >
              Crear concurso
            </button>
          </form>
        </>
      ) : (
        <Tabs>
          <div label="Información Básica">
            <div className="mx-auto w-8/12">
              <div className="flex flex-wrap flex-col md:flex-row">
                {items.map((value, key) => (
                  <Select
                    name={value.label}
                    key={key}
                    label={value.label}
                    options={value.options}
                    onChange={handleOnchangeSelect}
                  />
                ))}
              </div>
              <section className="flex flex-col mx-auto sm:flex-row sm:items-center sm:my-20">
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Documento.list
                  doc_bases={doc_bases}
                  doc_guia={doc_guia}
                  doc_req={doc_req}
                  imagePdf={imagePdf}
                  file={file}
                />
                <Documento
                  onChange={handleOnChangeFile}
                  handleOnUpdate={handleOnUpdate}
                  doc_bases={doc_bases}
                  doc_guia={doc_guia}
                  doc_req={doc_req}
                />
              </section>
            </div>
          </div>

          <div label="Cronograma">
            <div className="flex flex-col sm:flex-row my-3 sm:mx-auto sm:w-2/4">
              <label htmlFor="fecha_ini" className="mr-10">
                <span className="block">Fecha Inicio</span>
                <input
                  type="date"
                  name="fecha_ini"
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-upeu-3 focus:ring focus:ring-upeu-3 focus:ring-opacity-50 mr-10"
                  value={fecha_ini || ""}
                  onChange={handleOnchangeSelect}
                />
              </label>
              <label htmlFor="fecha_fin" className="mr-10">
                <span className="block">Fecha Fin</span>
                <input
                  type="date"
                  name="fecha_fin"
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-upeu-3 focus:ring focus:ring-upeu-3 focus:ring-opacity-50 mr-10"
                  value={fecha_fin || ""}
                  onChange={handleOnchangeSelect}
                />
              </label>
            </div>

            <form
              onSubmit={handleOnUpdate}
              className="flex w-full justify-center"
            >
              <button className="focus:outline-none border p-2 bg-upeu-3 text-white w-full sm:w-3/12 rounded-xl my-5">
                Guardar
              </button>
            </form>
          </div>
          <div label="Nomina">
            <Faq>
              <Faq.QAItem>
                <Faq.Question answerId="q1" getDocentes={getAuxiliares}>
                  {(isOpen) => {
                    return (
                      <>
                        <span>Docentes Auxiliares</span>
                        {isOpen ? (
                          <img
                            src={flecharriba}
                            className="inline-block h-3 m-4 ml-auto"
                            alt="flechariba"
                          />
                        ) : (
                          <img
                            src={flechabajo}
                            className="inline-block h-3 m-4 ml-auto"
                            alt="flechabajo"
                          />
                        )}
                      </>
                    );
                  }}
                </Faq.Question>
                <Faq.Answer id="q1">
                  {auxiliares.length === 0 || auxiliares === null ? (
                    <div> No hay datos </div>
                  ) : (
                    <TableTemplate
                      label1="DNI"
                      label2="NOMBRE"
                      label3="EMAIL"
                      onSubmit={onSendEmail}
                      docentes={auxiliares}
                    />
                  )}
                </Faq.Answer>
              </Faq.QAItem>

              <Faq.QAItem>
                <Faq.Question answerId="q2" getDocentes={getAsociados}>
                  {(isOpen) => {
                    return (
                      <>
                        <span>Docentes Asociados</span>
                        {isOpen ? (
                          <img
                            src={flecharriba}
                            className="inline-block h-3 m-4 ml-auto"
                            alt="flechariba"
                          />
                        ) : (
                          <img
                            src={flechabajo}
                            className="inline-block h-3 m-4 ml-auto"
                            alt="flechabajo"
                          />
                        )}
                      </>
                    );
                  }}
                </Faq.Question>
                <Faq.Answer id="q2">
                  {asociados.length === 0 || asociados === null ? (
                    <div> No hay datos </div>
                  ) : (
                    <TableTemplate
                      label1="DNI"
                      label2="NOMBRE"
                      label3="EMAIL"
                      onSubmit={onSendEmail}
                      docentes={asociados}
                    />
                  )}
                </Faq.Answer>
              </Faq.QAItem>

              <Faq.QAItem>
                <Faq.Question answerId="q3" getDocentes={getPrincipales}>
                  {(isOpen) => {
                    return (
                      <>
                        <span>Docentes Principal</span>
                        {isOpen ? (
                          <img
                            src={flecharriba}
                            className="inline-block h-3 m-4 ml-auto"
                            alt="flechariba"
                          />
                        ) : (
                          <img
                            src={flechabajo}
                            className="inline-block h-3 m-4 ml-auto"
                            alt="flechabajo"
                          />
                        )}
                      </>
                    );
                  }}
                </Faq.Question>
                <Faq.Answer id="q3">
                  {principales.length === 0 || principales === null ? (
                    <div> No hay datos </div>
                  ) : (
                    <TableTemplate
                      label1="DNI"
                      label2="NOMBRE"
                      label3="LOCO"
                      onSubmit={onSendEmail}
                      docentes={principales}
                    />
                  )}
                </Faq.Answer>
              </Faq.QAItem>
            </Faq>
            <form onSubmit={handleTerminar} className="flex justify-end">
              <button
                className="px-2 py-1 bg-upeu-3 text-white rounded-xl w-1/4"
                type="submit"
              >
                Terminar
              </button>
            </form>
          </div>
        </Tabs>
      )}
    </>
  );
};
export default Comision;
