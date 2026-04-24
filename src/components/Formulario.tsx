import { useForm } from 'react-hook-form'
import Error from './Error'
import { usePacienteStore } from '../store/store'
import type { DraftPatient } from '../types'
import { useEffect, useRef } from 'react'


const Formulario = () => {

  const pacienteActivo = usePacienteStore((state) => state.pacienteActivo)
  const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)
  const actualizarPaciente = usePacienteStore((state) => state.actualizarPaciente)
  const limpiarPacienteActivo = usePacienteStore((state) => state.limpiarPacienteActivo)

  const formRef = useRef<HTMLDivElement>(null)

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<DraftPatient>()

  const registrarPaciente = (data: DraftPatient) => {
    if (pacienteActivo) {
      actualizarPaciente(data)
    } else {
      agregarPaciente(data)
    }
    reset()
  }

  useEffect(() => {
    if (pacienteActivo) {
      setValue('name', pacienteActivo.name, { shouldDirty: true })
      setValue('caretaker', pacienteActivo.caretaker, { shouldDirty: true })
      setValue('email', pacienteActivo.email, { shouldDirty: true })
      setValue('date', pacienteActivo.date, { shouldDirty: true })
      setValue('symptoms', pacienteActivo.symptoms, { shouldDirty: true })
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      reset()
    }
  }, [pacienteActivo])

  const handleCancelar = () => {
    limpiarPacienteActivo()
    reset()
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5" ref={formRef}>
        <h2 className="font-black text-3xl text-center">
          {pacienteActivo ? 'Editar Paciente' : 'Seguimiento Pacientes'}
        </h2>

        <p className="text-lg mt-5 text-center mb-10">
            {pacienteActivo ? (
              <>Modifica los datos del {''}
                <span className="text-indigo-600 font-bold">Paciente</span>
              </>
            ) : (
              <>Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
              </>
            )}
        </p>

        <form 
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            noValidate
            onSubmit={handleSubmit(registrarPaciente)}
        >
              <div className="mb-5">
                  <label htmlFor="name" className="text-sm uppercase font-bold">
                      Paciente 
                  </label>
                  <input  
                      id="name"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Paciente" 
                      {...register('name', { 
                        required: "El nombre del paciente es obligatorio", 
                        minLength: { value: 4, message: "El nombre del paciente debe tener al menos 4 caracteres"
                        }
                      })}

                 />
                {errors.name &&
                    <Error>{errors.name?.message?.toString()}</Error>
                }
                
              </div>

              <div className="mb-5">
                <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                    Propietario 
                </label>
                <input  
                    id="caretaker"
                    className="w-full p-3  border border-gray-100"  
                    type="text" 
                    placeholder="Nombre del Propietario" 
                     {...register('caretaker', { 
                        required: "El nombre del propietario es obligatorio", 
                        minLength: { value: 4, message: "El nombre del propietario debe tener al menos 4 caracteres"
                        }
                      })}
                />
                {errors.caretaker && <Error>{errors.caretaker?.message?.toString()}</Error>}
              </div>

            <div className="mb-5">
              <label htmlFor="email" className="text-sm uppercase font-bold">
                  Email 
              </label>
              <input  
                  id="email"
                  className="w-full p-3  border border-gray-100"  
                  type="email" 
                  placeholder="Email de Registro" 
                   {...register('email', { 
                        required: "El email es obligatorio", 
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El email no es válido"
                        }
                      })}
              />
              {errors.email && <Error>{errors.email?.message?.toString()}</Error>}
            </div>

            <div className="mb-5">
                <label htmlFor="date" className="text-sm uppercase font-bold">
                    Fecha Alta 
                </label>
                <input  
                    id="date"
                    className="w-full p-3  border border-gray-100"  
                    type="date" 
                     {...register('date', { 
                        required: "La fecha de alta es obligatoria"
                      })}
                />
                {errors.date && <Error>{errors.date?.message?.toString()}</Error>}
            </div>
            
            <div className="mb-5">
                <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                Síntomas 
                </label>
                <textarea  
                    id="symptoms"
                    className="w-full p-3  border border-gray-100"  
                    placeholder="Síntomas del paciente"
                     {...register('symptoms', { 
                        required: "Los síntomas son obligatorios", 
                        minLength: { value: 10, message: "Los síntomas deben tener al menos 10 caracteres"
                        }
                      })} 
                ></textarea>
                {errors.symptoms && <Error>{errors.symptoms?.message?.toString()}</Error>}
            </div>

            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value={pacienteActivo ? "Actualizar Paciente" : "Guardar Paciente"}
            />
                {pacienteActivo && (
                    <button
                        type="button"
                        className="bg-gray-500 w-full p-3 text-white uppercase font-bold hover:bg-gray-600 cursor-pointer transition-colors"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                )}

        </form> 
    </div>
  )

}

export default Formulario