import React, { Fragment, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import "../../styles/modal.css";
import UserService from "../../auth/docente/user.service";
import { ReactComponent as Archivo } from "../../assets/icons/archivo-modal.svg";
import { ReactComponent as Basura } from "../../assets/icons/basura.svg";
import { ReactComponent as Ojo } from "../../assets/icons/ojo.svg";
import {
  Titulo,
  Grados,
  Estudios,
  Especializacion,
  Idiomas,
} from "../utils/modal/Utils";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SUPPORTED_FORMATS = ["application/pdf"];
const FILE_SIZE = 100;

const schema = yup.object().shape({
  nombre_grado: yup.string().required(),
  centro_estudios: yup.string().required(),
  // años: yup.number().positive().integer().required(),
  // creditos: yup.number().positive().integer().required(),
  iditem: yup
    .string()
    .test("empty-or-8-characters-check", (password) => password.length !== 0),
  pais: yup.string().required(),
  // file: yup
  //   .mixed()
  //   .required("You need to provide a file")
  //   .test("fileSize", "The file is too large", (value) => {
  //     return value && value[0].size <= 2000000;
  //   })
  //   .test("type", "We only support jpeg", (value) => {
  //     return value && value[0].type === "application/pdf";
  //   }),
});

const Modal = ({ isOpen, setIsOpen, nombreSubmodulo, id}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    setValue,
    setError,
  } = useForm();

  const [select, setSelect] = useState([]);
  const [form, setForm] = useState({
    iditem: undefined,
    file: undefined,
    nombre_grado: "",
    centro_estudios: "",
    años: "",
  });
  const [allForms, setAllForms] = useState([]);
  const [iditem, setIdItem] = useState();
  const [sumSubmodulo, setSumSub] = useState(0);

  useEffect(() => {
    getAll(nombreSubmodulo);
    console.log("hola");

  }, [nombreSubmodulo]);

  useEffect(() => {
    if (allForms.length === 0) {
      setSumSub(0)
      return;
    }
    const sumaPuntos = allForms.reduce(
      (puntosTotales, form) => puntosTotales + parseInt(form.puntaje),
      0
    );
    console.log(sumaPuntos);
    const data = {
      puntaje: sumaPuntos,
    };
    //con id de submodulos
    UserService.updatePuntajeSubmodulo(JSON.stringify(data), id)
      .then((response) => {
        const { puntaje } = response;
        if (puntaje) {
          setSumSub(puntaje);
        } else {
          setSumSub(0);
        }
      })
      .catch((e) => setSumSub(0));
  }, [allForms]);

  const getAll = (nombre) => {
    console.log(nombre);

    UserService.getItems(nombre)
      .then((response) => {
        console.log(response);
        const { select, info } = response;
        if (select) setSelect(select);
        if (info) setAllForms(info);
      })
      .catch((e) => console.log(e));
  };

  const handleOnChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setForm((prevState) => ({ ...prevState, file: undefined }));
      return;
    }

    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      let data = new FormData();
      data.append("file", file);
      console.log(reader.result);
      setForm((prevState) => ({
        ...prevState,
        file: file,
        preview: reader.result,
      }));
      UserService.uploadFile(data).then(
        (response) => {
          const { webViewLink } = response;
          console.log(response);
          setForm((prevState) => ({
            ...prevState,
            url_archivo: webViewLink,
          }));
          toast.success("📂 Archivo subido correctamente!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    };
    reader.readAsDataURL(file);
  };

  const createFormulario = (data, e) => {
    // e.preventDefault();
    console.log(data);
    const body = {
      iditems: data.iditem || data.iditemT,
      //grados
      nombre_grado: data.nombre_grado || undefined,
      //estudios
      nombre_estudios: data.nombre_estudios || undefined,
      creditos: data.creditos || 0,
      pais: data.pais || undefined,
      //titulos
      tipo_titulo: data.tipo_titulo || undefined,
      mencion_titulo: data.mencion_titulo || undefined,
      años: data.años || 0,
      centro_estudios: data.centro_estudios || undefined,
      //especialidad
      especialidad: data.especialidad || undefined,
      //idiomas
      lengua_materna: data.lengua_materna || undefined,
      idioma: data.idioma || undefined,
      unidad: data.unidad || 0,

      url_archivo: form.url_archivo,
      idsubmodulo: id,
    };
    console.log(body);

    UserService.createFormulario(JSON.stringify(body), nombreSubmodulo)
      .then((response) => {
        console.log(response);
        toast.success("✔️ Legajo creado correctamente", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getAll(nombreSubmodulo);
        e.target.reset();
        reset();
      })
      .catch((e) => console.log(e));
  };

  const renderModal = {
    TITULOS: () => (
      <Titulo
        Dialog={Dialog}
        onSubmit={handleSubmit(createFormulario)}
        register={register}
        select={select}
        errors={errors}
        onChange={handleOnChangeFile}
        allForms={allForms}
        suma={sumSubmodulo}
      />
    ),
    GRADOS: () => (
      <Grados
        Dialog={Dialog}
        onSubmit={handleSubmit(createFormulario)}
        register={register}
        select={select}
        errors={errors}
        onChange={handleOnChangeFile}
        allForms={allForms}
        suma={sumSubmodulo}
      />
    ),
    ESTUDIOS: () => (
      <Estudios
        Dialog={Dialog}
        onSubmit={handleSubmit(createFormulario)}
        register={register}
        select={select}
        errors={errors}
        onChange={handleOnChangeFile}
        allForms={allForms}
        iditem={iditem}
        setidItem={setIdItem}
        setValue={setValue}
        setError={setError}
        suma={sumSubmodulo}
      />
    ),
    "ESPECIALIZACION-DIPLOMATURAS": () => (
      <Especializacion
        Dialog={Dialog}
        onSubmit={handleSubmit(createFormulario)}
        register={register}
        select={select}
        errors={errors}
        onChange={handleOnChangeFile}
        allForms={allForms}
        iditem={iditem}
        setidItem={setIdItem}
        setValue={setValue}
        setError={setError}
        suma={sumSubmodulo}
      />
    ),
    "IDIOMAS-EXTRANJEROS-Y-O-NATIVOS": () => (
      <Idiomas
        Dialog={Dialog}
        onSubmit={handleSubmit(createFormulario)}
        register={register}
        select={select}
        errors={errors}
        onChange={handleOnChangeFile}
        allForms={allForms}
        iditem={iditem}
        setidItem={setIdItem}
        setValue={setValue}
        setError={setError}
        suma={sumSubmodulo}
      />
    ),

    default: () => (
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        as="div"
        className={`fixed inset-0 z-10 flex items-center justify-center overflow-y-auto ${
          isOpen ? "" : ""
        }`}
      >
        <div
          className={`absolute top-28 inset-0  flex items-center justify-center overflow-y-auto  ${
            isOpen ? "bg-upeu-3-100 opacity-50" : ""
          }`}
        ></div>

        <div className="flex flex-col rounded-3xl shadow-xl border border-gray-300 bg-clip-padding bg-gray-100 z-10 opacity-100  w-4/6 py-8 px-4  modal">
          <Dialog.Overlay />
          <Dialog.Title className="">
            {/* <div className="card__title flex text-center lg:text-left px-4  justify-between items-center">
            <h2 className="text-2xl font- font-extrabold break-all text-gray-700">
              Grado Academico
            </h2>
            <button>
              <img className="w-4" src="../images/close.svg" alt="" />
            </button>
          </div> */}
          </Dialog.Title>
          <Dialog.Description className="text-xl m-2 flex flex-wrap  w-full my-2">
            <div class="form__control flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4">
              <label
                class="control__label text-lg text-gray-600 font-bold break-all"
                for=""
              >
                Grado Obtenido
              </label>
              <input
                class="control__input rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
                type="text"
              />
              <label
                class="text-left w-full  text-red-600 text-sm font-medium px-5"
                for=""
              >
                Required *
              </label>
            </div>
            <div class="form__control flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4">
              <label
                class="control__label text-lg text-gray-600 font-bold break-all"
                for=""
              >
                Grado Obtenido
              </label>
              <input
                class="control__input rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
                type="text"
              />
              <label
                class="text-left w-full  text-red-600 text-sm font-medium px-5"
                for=""
              >
                Required *
              </label>
            </div>
            <div class="form__control flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4">
              <label
                class="control__label text-lg text-gray-600 font-bold break-all"
                for=""
              >
                Grado Obtenido
              </label>
              <input
                class="control__input rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
                type="text"
              />

              <label
                class="text-left w-full  text-red-600 text-sm font-medium px-5"
                for=""
              >
                Required *
              </label>
            </div>
          </Dialog.Description>
          <div className="card__list px-4 my-2 space-y-2  overflow-y-auto">
            <div class="list_card bg-white px-4 py-2 rounded-2xl shadow-lg grid grid-cols-12 border border-gray-200">
              <div class="list_card__title col-span-1 flex items-center">
                <h2 class="font-bold text-2xl">DR.</h2>
              </div>
              <div class="list_card__info col-span-9">
                <div class="info__name flex justify-center font-semibold text-lg">
                  <h3 class="">
                    En ciencias Politicas con mencion en investigacion
                    cientifica
                  </h3>
                </div>
                <div class="info__subname flex justify-around">
                  <h4 class="font-semibold text-gray-500">
                    Centro de estudios:
                  </h4>
                  <h4 class="font-semibold text-gray-600">
                    Universidad Peruana Union
                  </h4>
                </div>
              </div>
              <div class="list_card__controls col-span-2 flex justify-between items-center">
                <div class="control__status p-2">
                  <img class="w-8" src="../images/verified.svg" alt="" />
                </div>
                <button class="control__view bg-yellow-200 rounded-xl p-2 border border-gray-200 shadow-md">
                  <img class="w-8" src="../images/view.svg" alt="" />
                </button>
                <button class="control__delete bg-red-400 rounded-xl p-2 border border-gray-200 shadow-md">
                  <img class="w-8" src="../images/trash.svg" alt="" />
                </button>
              </div>
            </div>
          </div>

          {/* <p className="text-md m-4">
      Are you sure you want to deactivate your account? All of your data
      will be permanently removed. This action cannot be undone.
    </p>


    <button
      className="w-full m-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
      onClick={() => setIsOpen(false)}
    >
      Deactivate
    </button> */}
          <button
            className="m-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    ),
  };

  const render = renderModal[nombreSubmodulo]
    ? renderModal[nombreSubmodulo]()
    : renderModal["default"]();

  // return render;

  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={`fixed inset-0 z-10 flex items-center justify-center overflow-y-auto ${
        isOpen ? "" : ""
      }`}
    >
      <div
        className={`absolute top-28 inset-0  flex items-center justify-center overflow-y-auto  ${
          isOpen ? "bg-upeu-3-100 opacity-50" : ""
        }`}
      ></div>

      <div className="flex rounded-3xl shadow-xl border border-gray-300 bg-clip-padding bg-gray-100 z-10 opacity-100 w-8/12 modal">
        <Dialog.Overlay />
        <ToastContainer />

        <div className="flex flex-col py-8 px-2 w-full">
          {render}

          <button
            className="flex text-black w-max focus:outline-none text-5xl ml-auto px-2"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </div>
      </div>
    </Dialog>
  );
};
export default Modal;
