import React from "react";

const TableTemplate = ({ label1, label2, label3,onSubmit,docentes }) => {
  return (
    <>
      <table className="min-w-full w-12 divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {label1}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {label2}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
              {label3 === "EMAIL" ? (
                <>
                  <span>{label3}</span>
                  <form onSubmit={onSubmit}>
                    <button
                      type="submit"
                      className="ml-4 border p-2 rounded-xl bg-upeu-3 text-white"
                    >
                      Enviar Invitacion
                    </button>
                  </form>
                </>
              ) : (
                <span>{label3}</span>
              )}
            </th>
          </tr>
        </thead>

        {docentes.map((value, key) => {
          return (
            <tbody className="bg-white divide-y divide-gray-200" key={key}>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">{value.dni}</td>
                <td className="px-6 py-4 whitespace-nowrap">{value.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap">{value.correo}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
};


export default TableTemplate;