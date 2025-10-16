import clsx from "clsx";
import { Header } from "../../components/Header";
import { Widget } from "../../components/Widget";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ===================================================================================
// === INTERFACES Y DATOS TEMPORALES ===
// ===================================================================================

interface LowStockItem {
  producto_id: string;
  marca: string;
  tipo_nombre: string;
  stock_actual: number;
  minimo: number;
}

const lowStockData: LowStockItem[] = [
  // ... Datos de ejemplo ...
  // ... (otros datos) ...
];

const monthlyData = [
  { mes: "Ene", Gastos: 4000, Ingresos: 2400 },
  { mes: "Feb", Gastos: 3000, Ingresos: 1398 },
  // ... (otros datos) ...
];

interface Requisicion {
  folio: string;
  solicitante: string;
  fecha: string;
}

// Datos de la tabla de Requisiciones
const data: Requisicion[] = [];

function Home() {
  // Obtener fecha formateada
  const fecha = new Date();
  const opciones: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const fechaFormateada = new Intl.DateTimeFormat("es-MX", opciones).format(
    fecha
  );
  const fechaFinal =
    fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);

  // Función para determinar las clases de color del indicador de Stock
  const getStockClasses = (stockActual: number, minimo: number) => {
    if (stockActual < minimo * 0.5) {
      // Crítico: menos del 50% del mínimo (rojo)
      return "bg-red-100 text-red-800";
    }
    if (stockActual < minimo) {
      // Bajo Stock: entre el 50% y 100% del mínimo (amarillo)
      return "bg-yellow-100 text-yellow-800";
    }
    // Stock Suficiente (verde)
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="bg-[#F8F9FD]  h-dvh">
      <div className="px-5 py-7">
        <Header
          title={`Bienvenido Juan Pérez`}
          description={`Hoy es ${fechaFinal}`}
          name="Juan Pérez"
        />

        <div className=" flex flex-col gap-3.5">
          {/* Fila superior de Widgets (Requisiciones y Gastos) */}
          <div className=" flex lg:flex-row flex-col gap-2.5">
            <Widget title="Requisiciones">
              <div className="w-full">
                {/* Contenedor que permite Scroll Horizontal en Móviles (overflow-x-auto) */}
                <div className="rounded-lg overflow-x-auto">
                  {/* Tabla que contiene ambos (thead y tbody) para estructura básica */}
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Encabezado Fijo (thead) */}
                    <thead className="bg-gray-50">
                      {/* CRÍTICO: Usar 'table w-full table-fixed' para que las columnas mantengan el mismo ancho que el tbody con scroll */}
                      <tr className="table w-full table-fixed">
                        {["Folio", "Nombre solicitante", "Fecha", "Acción"].map(
                          (header) => (
                            <th
                              key={header}
                              className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>

                    <tbody className="block h-64 overflow-y-scroll divide-y divide-gray-200 bg-white">
                      {data.length === 0 ? (
                        <div className="flex h-full justify-center text-2xl font-bold text-gray-400 items-center ">
                          No existen requisiciones pendientes.
                        </div>
                      ) : (
                        data.map((req) => (
                          <tr
                            key={req.folio}
                            className="table w-full table-fixed hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {req.folio}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {req.solicitante}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {req.fecha}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {}}
                                className="text-green-600 hover:text-green-900 font-medium border border-green-500 rounded-md px-3 py-1 hover:bg-green-50 transition duration-150"
                              >
                                Ver requisición
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Widget>

            {/* WIDGET GASTOS MENSUALES: Gráfico de Barras con Recharts */}
            <Widget title="Gastos Mensuales">
              <div className="w-full h-full p-4">
                {/* ResponsiveContainer asegura que el gráfico se ajuste al Widget */}
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="mes" stroke="#374151" />
                    <YAxis stroke="#374151" />
                    <Tooltip
                      cursor={{ fill: "#f3f4f6" }}
                      // Formatea el valor con signo de dólar y separador de miles
                      formatter={(value: number) =>
                        `$${value.toLocaleString()}`
                      }
                    />
                    <Legend />
                    <Bar dataKey="Gastos" fill="#10B981" name="Gastos" />
                    <Bar dataKey="Ingresos" fill="#3B82F6" name="Ingresos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Widget>
          </div>

          {/* WIDGET BAJO STOCK: Tabla con Anchos Fijos para Alineación Perfecta */}
          <Widget title="Bajo Stock">
            <div className="w-full">
              <div className="rounded-lg overflow-x-auto">
                {/* Encabezado Fijo (Tabla 1) */}
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {/* CRÍTICO: Se usan anchos porcentuales fijos (w-[XX%]) en TH para compensar el scrollbar de la tabla inferior y asegurar la alineación */}
                      <th className="w-[15%] px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        ID
                      </th>
                      <th className="w-[20%] px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Marca
                      </th>
                      <th className="w-[30%] px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Tipo
                      </th>
                      <th className="w-[15%] px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Actual
                      </th>
                      <th className="w-[20%] px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Mínimo
                      </th>
                    </tr>
                  </thead>
                </table>

                {/* Cuerpo con Scroll Vertical (Tabla 2, dentro de un DIV con scroll) */}
                <div className="h-64 overflow-y-scroll">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="block h-64  divide-gray-200 bg-white">
                      {lowStockData.length === 0 ? (
                        <div className="flex h-full justify-center sm:text-xl md:text-2xl text-2xl font-bold text-gray-400 items-center ">
                          El inventario se encuentra en valores estables.
                        </div>
                      ) : (
                        lowStockData.map((item) => (
                          <tr
                            key={item.producto_id}
                            className="hover:bg-gray-50"
                          >
                            {/* CRÍTICO: Se usan los MISMOS anchos porcentuales fijos (w-[XX%]) en TD para forzar la alineación con los TH */}
                            <td className="w-[15%] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.producto_id}
                            </td>
                            <td className="w-[20%] px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {item.marca}
                            </td>
                            <td className="w-[30%] px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {item.tipo_nombre}
                            </td>
                            <td className="w-[15%] px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {/* Indicador de stock con color dinámico */}
                              <span
                                className={clsx(
                                  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                  getStockClasses(
                                    item.stock_actual,
                                    item.minimo
                                  )
                                )}
                              >
                                {item.stock_actual}
                              </span>
                            </td>
                            <td className="w-[20%] px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {item.minimo}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}

export default Home;
