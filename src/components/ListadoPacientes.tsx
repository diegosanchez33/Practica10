import { usePacienteStore } from '../store/store'
import Paciente from './Paciente'

const ListadoPacientes = () => {

    const pacientes = usePacienteStore(state => state.pacientes)

    return (
        <div className="md:w-1/2 lg:w-3/5">
            <h2 className="font-black text-3xl text-center">Lista de Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Administra tus {''}
                <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>
            {pacientes.map(paciente => (
                <Paciente key={paciente.id} paciente={paciente} />
            ))}
        </div>
    )
}

export default ListadoPacientes