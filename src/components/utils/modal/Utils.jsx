import React, { useState, useEffect } from "react";
import { ReactComponent as Archivo } from "../../../assets/icons/archivo-modal.svg";
import { ReactComponent as Basura } from "../../../assets/icons/basura.svg";
import { ReactComponent as Ojo } from "../../../assets/icons/ojo.svg";

const Titulo = ({
  Dialog,
  onSubmit,
  register,
  select,
  errors,
  onChange,
  allForms,
  suma
}) => {
  return (
    <>
      <form className="" onSubmit={onSubmit}>
        <Dialog.Title>
          <div className="card__title flex text-center lg:text-left px-4  justify-between items-center">
            <h2 className="text-2xl font- font-extrabold break-all text-gray-700">
              Título Profesional
            </h2>
          </div>
        </Dialog.Title>
        <Dialog.Description className="flex flex-col">
          <div className="flex w-full text-xl m-2 flex-wrap">
            <label htmlFor="iditemT">
              <input
                type="text"
                name="iditemT"
                {...register("iditemT")}
                value="15"
                className="hidden"
              />
            </label>

            <label
              htmlFor="tipo_titulo"
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/3 lg:w-2/5 px-4"
            >
              Nombre de titulo
              <input
                type="text"
                id=""
                name="tipo_titulo"
                {...register("tipo_titulo", {
                  required: true,
                })}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              />
              {errors.tipo_titulo && (
                <label class="text-left w-full  text-red-600 text-sm font-medium px-5">
                  Required *
                </label>
              )}
            </label>
            <label className="flex flex-col items-center mx-auto w-full sm:w-2/4 text-lg text-gray-600 font-bold break-all  px-4">
              Mención titulo
              <input
                type="text"
                id=""
                name="mencion_titulo"
                {...register("mencion_titulo", {
                  required: true,
                })}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              />
              {errors.mencion_titulo && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
          </div>
          <div className="flex w-full text-xl m-2 flex-wrap">
            <label
              htmlFor=""
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
            >
              Institucion
              <input
                type="text"
                id=""
                name="centro_estudios"
                {...register("centro_estudios", {
                  required: true,
                })}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              />
              {errors.centro_estudios && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label
              htmlFor=""
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
            >
              Años
              <input
                type="text"
                id=""
                name="años"
                {...register("años", {
                  required: false,
                })}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              />
              {errors.años && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 px-4 ">
              <span className="">Archivo (*)</span>
              <label className=" rounded-full bg-lime-500 py-2 px-4 outline-none shadow-md w-16 h-11 border border-gray-300">
                <Archivo className="cursor-pointer" />
                <input
                  type="file"
                  className="hidden"
                  name="file"
                  {...register("file", {
                    required: true,
                  })}
                  onChange={onChange}
                />
              </label>
              {errors.file && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </div>
            <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 sm:my-5">
              <button
                type="submit"
                className="rounded-full bg-indigo-400 py-2 px-4 outline-none shadow-md w-max  border border-gray-300"
              >
                Añadir
              </button>
            </div>
          </div>
        </Dialog.Description>
      </form>

      <div className="card__list px-4 my-2 space-y-2 h-60 overflow-y-auto">
        {allForms.map((val, key) => (
          <div class="list_card bg-white px-4 py-2 rounded-2xl shadow-lg grid grid-cols-12 border border-gray-200">
            <div class="list_card__title col-span-1 flex items-center">
              <h2 class="font-bold text-2xl">{val.tipo_titulo}</h2>
            </div>
            <div class="list_card__info col-span-8">
              <div class="info__name flex justify-center font-semibold text-lg">
                <h3 class="">{val.mencion_titulo}</h3>
              </div>
              <div class="info__subname flex justify-around">
                <h4 class="font-semibold text-gray-500">Centro de estudios:</h4>
                <h4 class="font-semibold text-gray-600">
                  {val.centro_estudios}
                </h4>
              </div>
            </div>
            <div class="col-span-3 flex justify-between items-center">
              <span className="text-sm flex justify-center items-center">
                Puntaje &nbsp;
                <span className="text-base font-bold">{val.puntaje}</span>
              </span>

              <div class="control__status p-2">
                <img class="w-8" src="../images/verified.svg" alt="" />
              </div>
              <a
                class="control__view bg-yellow-200 rounded-xl p-2 border border-gray-200 shadow-md"
                href={val.url_archivo}
                target="_blank"
                rel="noreferrer"
              >
                <Ojo />
              </a>
              <button class="control__delete bg-red-400 rounded-xl p-2 border border-gray-200 shadow-md">
                <Basura />
              </button>
            </div>
          </div>
          
        ))}
        
      </div>
      <span className="mx-7 text-base font-bold">Puntaje Subtotal: {suma}</span>
    </>
  );
};
const Grados = ({
  Dialog,
  onSubmit,
  register,
  select,
  errors,
  onChange,
  allForms,
  suma
}) => (
  <>
    <form className="" onSubmit={onSubmit}>
      <Dialog.Title>
        <div className="card__title flex text-center lg:text-left px-4  justify-between items-center">
          <h2 className="text-2xl font- font-extrabold break-all text-gray-700">
            Grado Academico
          </h2>
        </div>
      </Dialog.Title>
      <Dialog.Description className="flex flex-col">
        <div className="flex w-full text-xl m-2 flex-wrap">
          <label
            htmlFor="iditem"
            className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
          >
            Grado obtenido
            <select
              className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              // value={form.iditem}
              {...register("iditem", {
                required: true,
              })}
              // onChange={(e) => {
              //   setForm((prevState) => ({
              //     ...prevState,
              //     iditem: e.target.value,
              //   }));
              // }}
            >
              <option defaultValue value="" hidden>
                Elige una opcion
              </option>
              {select.map((val, key) => (
                <option key={key} value={val.iditems}>
                  {val.nombre}
                </option>
              ))}
            </select>
            {errors.iditem && (
              <label
                class="text-left w-full  text-red-600 text-sm font-medium px-5"
                for=""
              >
                Required *
              </label>
            )}
          </label>
          <label className="flex flex-col items-center mx-auto w-full sm:w-7/12 text-lg text-gray-600 font-bold break-all  px-4">
            Nombre del grado(*)
            <input
              type="text"
              id=""
              name="nombre_grado"
              {...register("nombre_grado", {
                required: true,
              })}
              className="min-w-full md:w-96 w-full  rounded-full  py-2 px-4 outline-none shadow-md border border-gray-300 "
            />
            {errors.nombre_grado && (
              <label
                class="text-left w-full  text-red-600 text-sm font-medium px-5"
                for=""
              >
                Required *
              </label>
            )}
          </label>
        </div>
        <div className="flex w-full text-xl m-2 flex-wrap">
          <label
            htmlFor=""
            className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
          >
            Centro de estudios (*)
            <input
              type="text"
              id=""
              name="centro_estudios"
              {...register("centro_estudios", {
                required: true,
              })}
              className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
            />
            {errors.centro_estudios && (
              <label
                class="text-left w-full  text-red-600 text-sm font-medium px-5"
                for=""
              >
                Required *
              </label>
            )}
          </label>
          <label
            htmlFor=""
            className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
          >
            Años
            <input
              type="text"
              id=""
              name="años"
              {...register("años", {
                required: false,
              })}
              className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
            />
            {errors.años && (
              <label
                class="text-left w-full  text-red-600 text-sm font-medium px-5"
                for=""
              >
                Required *
              </label>
            )}
          </label>
          <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 px-4 ">
            <span className="">Archivo (*)</span>
            <label className=" rounded-full bg-lime-500 py-2 px-4 outline-none shadow-md w-16 h-11 border border-gray-300">
              <Archivo className="cursor-pointer" />
              <input
                type="file"
                className="hidden"
                name="file"
                {...register("file", {
                  required: true,
                })}
                onChange={onChange}
              />
            </label>
            {errors.file && (
              <label
                class="text-left w-full  text-red-600 text-sm font-medium px-5"
                for=""
              >
                Required *
              </label>
            )}
          </div>
          <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 sm:my-5">
            <button
              type="submit"
              className="rounded-full bg-indigo-400 py-2 px-4 outline-none shadow-md w-max  border border-gray-300"
            >
              Añadir
            </button>
          </div>
        </div>
      </Dialog.Description>
    </form>

    <div className="card__list px-4 my-2 space-y-2 h-60 overflow-y-auto">
      {allForms.map((val, key) => (
        <div class="list_card bg-white px-4 py-2 rounded-2xl shadow-lg grid grid-cols-12 border border-gray-200">
          <div class="list_card__title col-span-1 flex items-center">
            <h2 class="font-bold text-2xl">{val.abreviatura}</h2>
          </div>
          <div class="list_card__info col-span-8">
            <div class="info__name flex justify-center font-semibold text-lg">
              <h3 class="">{val.nombre}</h3>
            </div>
            <div class="info__subname flex justify-around">
              <h4 class="font-semibold text-gray-500">Centro de estudios:</h4>
              <h4 class="font-semibold text-gray-600">{val.centro_estudios}</h4>
            </div>
          </div>
          <div class="col-span-3 flex justify-between items-center">
            <span className="text-sm flex justify-center items-center">
              Puntaje &nbsp;
              <span className="text-base font-bold">{val.puntaje}</span>
            </span>

            <div class="control__status p-2">
              <img class="w-8" src="../images/verified.svg" alt="" />
            </div>
            <a
              class="control__view bg-yellow-200 rounded-xl p-2 border border-gray-200 shadow-md"
              href={val.url_archivo}
              target="_blank"
              rel="noreferrer"
            >
              <Ojo />
            </a>
            <button class="control__delete bg-red-400 rounded-xl p-2 border border-gray-200 shadow-md">
              <Basura />
            </button>
          </div>
        </div>
      ))}
    </div>
    <span className="mx-7 text-base font-bold">Puntaje Subtotal: {suma}</span>

  </>
);

const Estudios = ({
  Dialog,
  onSubmit,
  register,
  select,
  errors,
  onChange,
  allForms,
  iditem,
  setidItem,
  setValue,
  setError,
  suma
}) => {
  useEffect(() => {
    register("creditos", { require: true });
    register("años", { require: true });
  }, []);

  return (
    <>
      <form className="" onSubmit={onSubmit}>
        <Dialog.Title>
          <div className="card__title flex text-center lg:text-left px-4  justify-between items-center">
            <h2 className="text-2xl font- font-extrabold break-all text-gray-700">
              Estudios Concluidos
            </h2>
          </div>
        </Dialog.Title>
        <Dialog.Description className="flex flex-col">
          <div className="flex w-full text-xl m-2 flex-wrap">
            <label
              htmlFor="iditem"
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
            >
              Tipo de Estudio
              <select
                name="iditem"
                {...register("iditem", { required: true })}
                onChange={(e) => {
                  setidItem(e.target.value);
                }}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              >
                <option defaultValue value="" hidden>
                  Elige una opcion
                </option>
                {select.map((val, key) => (
                  <option key={key} value={val.iditems}>
                    {val.nombre}
                  </option>
                ))}
              </select>
              {errors.iditem && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label className="flex flex-col items-center mx-auto w-full sm:w-7/12 text-lg text-gray-600 font-bold break-all  px-4">
              Nombre de estudio
              <input
                type="text"
                id=""
                name="nombre_estudios"
                {...register("nombre_estudios", {
                  required: true,
                })}
                className="min-w-full md:w-96 w-full  rounded-full  py-2 px-4 outline-none shadow-md border border-gray-300 "
              />
              {errors.nombre_estudios && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
          </div>
          <div className="flex w-full text-xl m-2 flex-wrap">
            <label
              htmlFor=""
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
            >
              Centro de estudios
              <input
                type="text"
                id=""
                name="centro_estudios"
                {...register("centro_estudios", {
                  required: true,
                })}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              />
              {errors.centro_estudios && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label
              htmlFor="pais"
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/6 px-4"
            >
              Pais
              <input
                type="text"
                id="pais"
                name="pais"
                {...register("pais", {
                  required: true,
                })}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              />
              {errors.pais && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label
              htmlFor=""
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-3/12 lg:w-1/6 px-4"
            >
              {iditem === "14" ? (
                <>
                  Creditos
                  <input
                    type="text"
                    id=""
                    name="creditos"
                    onChange={(e) => setValue("creditos", e.target.value)}
                    className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
                  />
                  {errors.creditos && (
                    <label
                      class="text-left w-full  text-red-600 text-sm font-medium px-5"
                      for=""
                    >
                      Required *
                    </label>
                  )}
                </>
              ) : (
                <>
                  Años
                  <input
                    type="text"
                    id=""
                    name="años"
                    onChange={(e) => setValue("años", e.target.value)}
                    className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
                  />
                  {errors.años && (
                    <label
                      class="text-left w-full  text-red-600 text-sm font-medium px-5"
                      for=""
                    >
                      Required *
                    </label>
                  )}
                </>
              )}
            </label>
            <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 px-4 ">
              <span className="">Archivo (*)</span>
              <label className=" rounded-full bg-lime-500 py-2 px-4 outline-none shadow-md w-16 h-11 border border-gray-300">
                <Archivo className="cursor-pointer" />
                <input
                  type="file"
                  className="hidden"
                  name="file"
                  {...register("file", {
                    required: true,
                  })}
                  onChange={onChange}
                />
              </label>
              {errors.file && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </div>
            <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 sm:my-5">
              <button
                type="submit"
                className="rounded-full bg-indigo-400 py-2 px-4 outline-none shadow-md w-max  border border-gray-300"
              >
                Añadir
              </button>
            </div>
          </div>
        </Dialog.Description>
      </form>

      <div className="card__list px-4 my-2 space-y-2 h-60 overflow-y-auto">
        {allForms.map((val, key) => (
          <div class="list_card bg-white px-4 py-2 rounded-2xl shadow-lg grid grid-cols-12 border border-gray-200">
            <div class="list_card__title col-span-1 flex items-center">
              <h2 class="font-bold text-2xl">{val.pais}</h2>
            </div>
            <div class="list_card__info col-span-8">
              <div class="info__name flex justify-center font-semibold text-lg">
                <h3 class="">{val.nombre_estudios}</h3>
              </div>
              <div class="info__subname flex justify-around">
                <h4 class="font-semibold text-gray-500">Centro de estudios:</h4>
                <h4 class="font-semibold text-gray-600">
                  {val.centro_estudios}
                </h4>
              </div>
            </div>
            <div class="col-span-3 flex justify-between items-center">
              <span className="text-sm flex justify-center items-center">
                Puntaje &nbsp;
                <span className="text-base font-bold">{val.puntaje}</span>
              </span>

              <div class="control__status p-2">
                <img class="w-8" src="../images/verified.svg" alt="" />
              </div>
              <a
                class="control__view bg-yellow-200 rounded-xl p-2 border border-gray-200 shadow-md"
                href={val.url_archivo}
                target="_blank"
                rel="noreferrer"
              >
                <Ojo />
              </a>
              <button class="control__delete bg-red-400 rounded-xl p-2 border border-gray-200 shadow-md">
                <Basura />
              </button>
            </div>
          </div>
        ))}
      </div>
      <span className="mx-7 text-base font-bold">Puntaje Subtotal: {suma}</span>

    </>
  );
};

const Especializacion = ({
  Dialog,
  onSubmit,
  register,
  select,
  errors,
  onChange,
  allForms,
  iditem,
  setidItem,
  setValue,
  setError,
  suma
}) => {
  useEffect(() => {
    register("creditos", { require: true });
    register("años", { require: true });
  }, []);

  return (
    <>
      <form className="" onSubmit={onSubmit}>
        <Dialog.Title>
          <div className="card__title flex text-center lg:text-left px-4  justify-between items-center">
            <h2 className="text-2xl font- font-extrabold break-all text-gray-700">
              Especialización Y diplomaturas
            </h2>
          </div>
        </Dialog.Title>
        <Dialog.Description className="flex flex-col">
          <div className="flex w-full text-xl m-2 flex-wrap">
            <label
              htmlFor="iditem"
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
            >
              Tipo de especialidad / diplomatura
              <select
                name="iditem"
                {...register("iditem", { required: true })}
                onChange={(e) => {
                  setidItem(e.target.value);
                }}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              >
                <option defaultValue value="" hidden>
                  Elige una opcion
                </option>
                {select.map((val, key) => (
                  <option key={key} value={val.iditems}>
                    {val.nombre}
                  </option>
                ))}
              </select>
              {errors.iditem && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label className="flex flex-col items-center mx-auto w-full sm:w-7/12 text-lg text-gray-600 font-bold break-all  px-4">
              Especialidad
              <input
                type="text"
                id=""
                name="especialidad"
                {...register("especialidad", {
                  required: true,
                })}
                className="min-w-full md:w-96 w-full  rounded-full  py-2 px-4 outline-none shadow-md border border-gray-300 "
              />
              {errors.especialidad && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
          </div>
          <div className="flex w-full text-xl m-2 flex-wrap">
            <label
              htmlFor=""
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
            >
              Centro de estudios
              <input
                type="text"
                id=""
                name="centro_estudios"
                {...register("centro_estudios", {
                  required: true,
                })}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              />
              {errors.centro_estudios && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label
              htmlFor=""
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-3/12 lg:w-1/6 px-4"
            >
              {iditem === "5" ? (
                <>
                  Años
                  <input
                    type="text"
                    id=""
                    name="años"
                    onChange={(e) => setValue("años", e.target.value)}
                    className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
                  />
                  {errors.años && (
                    <label
                      class="text-left w-full  text-red-600 text-sm font-medium px-5"
                      for=""
                    >
                      Required *
                    </label>
                  )}
                </>
              ) : (
                <>
                  Creditos
                  <input
                    type="text"
                    id=""
                    name="creditos"
                    onChange={(e) => setValue("creditos", e.target.value)}
                    className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
                  />
                  {errors.creditos && (
                    <label
                      class="text-left w-full  text-red-600 text-sm font-medium px-5"
                      for=""
                    >
                      Required *
                    </label>
                  )}
                </>
              )}
            </label>
            <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 px-4 ">
              <span className="">Archivo (*)</span>
              <label className=" rounded-full bg-lime-500 py-2 px-4 outline-none shadow-md w-16 h-11 border border-gray-300">
                <Archivo className="cursor-pointer" />
                <input
                  type="file"
                  className="hidden"
                  name="file"
                  {...register("file", {
                    required: true,
                  })}
                  onChange={onChange}
                />
              </label>
              {errors.file && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </div>
            <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 sm:my-5">
              <button
                type="submit"
                className="rounded-full bg-indigo-400 py-2 px-4 outline-none shadow-md w-max  border border-gray-300"
              >
                Añadir
              </button>
            </div>
          </div>
        </Dialog.Description>
      </form>

      <div className="card__list px-4 my-2 space-y-2 h-60 overflow-y-auto">
        {allForms.map((val, key) => (
          <div class="list_card bg-white px-4 py-2 rounded-2xl shadow-lg grid grid-cols-12 border border-gray-200">
            <div class="list_card__title col-span-1 flex items-center">
              <h2 class="font-bold text-2xl">Especialista</h2>
            </div>
            <div class="list_card__info col-span-8">
              <div class="info__name flex justify-center font-semibold text-lg">
                <h3 class="">{val.especialidad}</h3>
              </div>
              <div class="info__subname flex justify-around">
                <h4 class="font-semibold text-gray-500">Centro de estudios:</h4>
                <h4 class="font-semibold text-gray-600">
                  {val.centro_estudios}
                </h4>
              </div>
            </div>
            <div class="col-span-3 flex justify-between items-center">
              <span className="text-sm flex justify-center items-center">
                Puntaje &nbsp;
                <span className="text-base font-bold">{val.puntaje}</span>
              </span>

              <div class="control__status p-2">
                <img class="w-8" src="../images/verified.svg" alt="" />
              </div>
              <a
                class="control__view bg-yellow-200 rounded-xl p-2 border border-gray-200 shadow-md"
                href={val.url_archivo}
                target="_blank"
                rel="noreferrer"
              >
                <Ojo />
              </a>
              <button class="control__delete bg-red-400 rounded-xl p-2 border border-gray-200 shadow-md">
                <Basura />
              </button>
            </div>
          </div>
        ))}
      </div>
      <span className="mx-7 text-base font-bold">Puntaje Subtotal: {suma}</span>

    </>
  );
};

const Idiomas = ({
  Dialog,
  onSubmit,
  register,
  select,
  errors,
  onChange,
  allForms,
  iditem,
  setidItem,
  setValue,
  setError,
  suma
}) => {

  return (
    <>
      <form className="" onSubmit={onSubmit}>
        <Dialog.Title>
          <div className="card__title flex text-center lg:text-left px-4  justify-between items-center">
            <h2 className="text-2xl font- font-extrabold break-all text-gray-700">
              Idiomas
            </h2>
          </div>
        </Dialog.Title>
        <Dialog.Description className="flex flex-col">
          <div className="flex text-xl m-2 flex-wrap">
            <label
              htmlFor="iditem"
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/4 px-4"
            >
              Nivel 
              <select
                name="iditem"
                {...register("iditem", { required: true })}
                onChange={(e) => {
                  setidItem(e.target.value);
                }}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              >
                <option defaultValue value="" hidden>
                  Elige una opcion
                </option>
                {select.map((val, key) => (
                  <option key={key} value={val.iditems}>
                    {val.nombre}
                  </option>
                ))}
              </select>
              {errors.iditem && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label className="flex flex-col items-center mx-auto w-full sm:w-1/3 text-lg text-gray-600 font-bold break-all  px-4">
              Idioma
              <input
                type="text"
                id=""
                name="idioma"
                {...register("idioma", {
                  required: true,
                })}
                className="min-w-full  w-full  rounded-full  py-2 px-4 outline-none shadow-md border border-gray-300 "
              />
              {errors.idioma && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label className="flex flex-col items-center mx-auto w-full sm:w-1/3 text-lg text-gray-600 font-bold break-all  px-4">
              Lengua Materna
              <input
                type="text"
                id=""
                name="lengua_materna"
                {...register("lengua_materna", {
                  required: true,
                })}
                className="min-w-full  w-full  rounded-full  py-2 px-4 outline-none shadow-md border border-gray-300 "
              />
              {errors.idioma && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
          </div>
          <div className="flex w-full text-xl m-2 flex-wrap">
            <label
              htmlFor=""
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 px-4"
            >
              Centro de estudios
              <input
                type="text"
                id=""
                name="centro_estudios"
                {...register("centro_estudios", {
                  required: true,
                })}
                className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
              />
              {errors.centro_estudios && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </label>
            <label
              htmlFor="unidad"
              className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-3/12 lg:w-1/6 px-4"
            >
                <>
                  Unidad
                  <input
                    type="text"
                    name="unidad"
                    {...register("unidad", {
                      required: true,
                    })}
                    className="rounded-full py-2 px-4 outline-none shadow-md w-full border border-gray-300"
                  />
                  {errors.unidad && (
                    <label
                      class="text-left w-full  text-red-600 text-sm font-medium px-5"
                      for=""
                    >
                      Required *
                    </label>
                  )}
                </>
            </label>
            <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 px-4 ">
              <span className="">Archivo (*)</span>
              <label className=" rounded-full bg-lime-500 py-2 px-4 outline-none shadow-md w-16 h-11 border border-gray-300">
                <Archivo className="cursor-pointer" />
                <input
                  type="file"
                  className="hidden"
                  name="file"
                  {...register("file", {
                    required: true,
                  })}
                  onChange={onChange}
                />
              </label>
              {errors.file && (
                <label
                  class="text-left w-full  text-red-600 text-sm font-medium px-5"
                  for=""
                >
                  Required *
                </label>
              )}
            </div>
            <div className="text-lg text-gray-600 font-bold break-all flex flex-col items-center w-full sm:w-1/6 sm:my-5">
              <button
                type="submit"
                className="rounded-full bg-indigo-400 py-2 px-4 outline-none shadow-md w-max  border border-gray-300"
              >
                Añadir
              </button>
            </div>
          </div>
        </Dialog.Description>
      </form>

      <div className="card__list px-4 my-2 space-y-2 h-60 overflow-y-auto">
        {allForms.map((val, key) => (
          <div class="list_card bg-white px-4 py-2 rounded-2xl shadow-lg grid grid-cols-12 border border-gray-200">
            <div class="list_card__title col-span-1 flex items-center">
              <h2 class="font-bold text-2xl">{val.idioma}</h2>
            </div>
            <div class="list_card__info col-span-8">
              <div class="info__name flex justify-center font-semibold text-lg">
                <h3 class="">{val.nivel}</h3>
              </div>
              <div class="info__subname flex justify-around">
                <h4 class="font-semibold text-gray-500">Centro de estudios:</h4>
                <h4 class="font-semibold text-gray-600">
                  {val.centro_estudios}
                </h4>
              </div>
            </div>
            <div class="col-span-3 flex justify-between items-center">
              <span className="text-sm flex justify-center items-center">
                Puntaje &nbsp;
                <span className="text-base font-bold">{val.puntaje}</span>
              </span>

              <div class="control__status p-2">
                <img class="w-8" src="../images/verified.svg" alt="" />
              </div>
              <a
                class="control__view bg-yellow-200 rounded-xl p-2 border border-gray-200 shadow-md"
                href={val.url_archivo}
                target="_blank"
                rel="noreferrer"
              >
                <Ojo />
              </a>
              <button class="control__delete bg-red-400 rounded-xl p-2 border border-gray-200 shadow-md">
                <Basura />
              </button>
            </div>
          </div>
        ))}
      </div>
      <span className="mx-7 text-base font-bold">Puntaje Subtotal: {suma}</span>

    </>
  );
};

export { Titulo, Grados, Estudios, Especializacion, Idiomas };
