import React, { useState, useEffect, Fragment, useRef } from "react";
import { ListaSubModulos } from "../../../components/utils/docente/Utils";
import UserService from "../../../auth/docente/user.service";
import { useParams, Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import Modal from "../../../components/modal/Modal";

let modulo = "";
var normalize = (function () {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};

  for (var i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  return function (str) {
    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return ret.join("");
  };
})();

const Submodulos = () => {
  const { idmodulo } = useParams();
  const { id } = useParams();
  const [subModulos, setSubModulos] = useState([]);
  const [ids, setIds] = useState({
    idlegajos: undefined,
    idmodulos: undefined,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [nomSub, setNomSub] = useState({ nombre: undefined, id: undefined });

  const cancelButtonRef = useRef(null);
  const [puntajeTotal, setPuntajeTotal] = useState(0);

  useEffect(() => {
    console.log(idmodulo);
    console.log(id);
    setIds({
      idlegajos: id,
      idmodulos: idmodulo,
    });

    UserService.getSubmodulos(idmodulo)
      .then((response) => {
        console.log(response);
        const { subModulos } = response;
        if (subModulos) setSubModulos(subModulos);
      })
      .catch((e) => console.log(e));
    UserService.getByIdModulos(idmodulo)
      .then((response) => {
        const { nombre } = response;
        console.log(nombre[0].nombre);
        if (nombre) modulo = nombre[0].nombre;
      })
      .catch((e) => console.error(e));
  }, []);

  const handleFindModal = (nombre, id) => {
    setIsOpen(!isOpen);

    setNomSub({ nombre: normalize(nombre), id });
  };
  useEffect(() => {
    const data = {
      idlegajos : id
    }
    UserService.getPuntajesSubmodulo(JSON.stringify(data),idmodulo)
      .then((response) => {
        console.log(response);
        const { vista } = response;
        console.log(response);
        if (vista.length === 0) {
          setPuntajeTotal(0);
          return;
        }

        const sumaModulo = vista.reduce(
          (total, vis) => total + parseInt(vis.puntaje),
          0
        );
        setPuntajeTotal(sumaModulo);

        const data = {
          puntaje: sumaModulo,
        };
        UserService.updatePuntajeModulos(JSON.stringify(data), idmodulo)
          .then((response) => {
            console.log(response);
            const { puntaje } = response;
            setPuntajeTotal(puntaje);
          })
          .catch((e) => setPuntajeTotal(0));
      })
      .catch((e) => console.log(e));
  },[nomSub]);

  //   function closeModal() {
  //     setIsOpen(false);
  //   }

  //   function openModal() {
  //     setIsOpen(true);
  //   }

  return (
    <div className="w-3/5 mx-auto p-3 border border-gray-400 rounded-lg shadow-2xl items-center">
      <Link className="text-2xl m-9" to={`/participar/${ids.idlegajos}`}>
        Requisitos
      </Link>
      <span className="text-base text-upeu-3 opacity-95">{modulo}</span>

      {subModulos.map((value, key) => (
        <ListaSubModulos
          key={key}
          label={value.nombre}
          image={value.image}
          onClick={() => {
            handleFindModal(value.nombre, value.idsubmodulos);
          }}
        />
      ))}
      <span>Puntaje Total: {puntajeTotal}</span>

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        nombreSubmodulo={nomSub.nombre}
        id={nomSub.id}
      />
    </div>
  );
};

export default Submodulos;
