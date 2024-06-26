import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmDeleteModal from "../Confirmacao/Confirmacao";
import UpdateModal from "../UpdateModal/UpdateModal";
import Toast from "react-bootstrap/Toast";
import './VerEstagiario.css'

function VerEstagiarios() {
  const [estagiarios, setEstagiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [estagiarioToDelete, setEstagiarioToDelete] = useState(null);
  const [selectedEstagiarioId, setSelectedEstagiarioId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Message,setMessage] = useState('')


  useEffect(() => {
    fetchEstagiarios();
  }, []);

  const fetchEstagiarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://89.116.214.37:3333/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEstagiarios(data);
      } else {
        console.error("Erro ao buscar estagiários:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar estagiários:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteIconClick = (estagiario) => {
    setEstagiarioToDelete(estagiario);
    setShowConfirmDeleteModal(true);
  };

  const handleUpdateData = async (selectedOption, newValue) => {
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      const id = selectedEstagiarioId;

      // Verificar se a opção selecionada é "Nome de usuário"
      if (selectedOption === "Nome de usuário") {
        const response = await fetch(`http://89.116.214.37:3333/user/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ username: newValue }) // Enviar apenas o novo nome de usuário
        });

        if (response.ok) {
          setShowUpdateToast(true); // Mostrar toast de sucesso
          fetchEstagiarios();
          setMessage('Nome de usuário atualizado com sucesso!')
          return; // Encerrar a função após a atualização do nome de usuário
        } else if (response.status === 409) {
          setShowUpdateToast(false); // Esconder o toast de sucesso
          setErrorMessage("Nome de usuário já existe");
          setShowErrorToast(true); // Mostrar toast de erro
          return;
        } else {
          console.error("Erro ao atualizar nome de usuário:", response.statusText);
          return;
        }
      }

      // Se a opção selecionada for "Email" ou outra opção, continuar com o código existente
      let body = {};
      if (selectedOption === "Email") {
        body.email = newValue;
      }

      const response = await fetch(`http://89.116.214.37:3333/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify(body)
      })

        console.log(response)
      if (response.ok) {
        
        setShowUpdateToast(true);
        setMessage("Email atualizado com sucesso!")
        fetchEstagiarios();
      } else {
        setShowUpdateToast(false); // Esconder o toast de sucesso
        setErrorMessage("Email já cadastrado");
        setShowErrorToast(true); // Mostrar toast de erro
        return;
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do estagiário:", error);
    } finally {
      setShowUpdateModal(false);
      setLoading(false);
    }
  };
  

  const handleCloseModal = () => {
    setShowConfirmDeleteModal(false);
    setShowUpdateModal(false);
    setLoading(false);
  };

  const handleAddEstagiarioClick = () => {
    setShowUpdateModal(true);
  };

  const handleDeleteEstagiario = async (estagiario) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://89.116.214.37:3333/user/${estagiario.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setShowDeleteToast(true);
        fetchEstagiarios();
      } else {
        console.error("Erro ao excluir estagiário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir estagiário:", error);
    } finally {
      setShowConfirmDeleteModal(false);
    }
  };

  return (
    <div className="table-container">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      ) : (
        <div className="table-wrapper">
          {estagiarios.length === 0 ? (
            <div>
              <p>Nenhum estagiário cadastrado. Vá para a opção Adicionar Estagiário</p>
            </div>
          ) : (
            <table className="estagiarios-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {estagiarios.map((estagiario, index) => (
                  <tr key={index}>
                    <td>{estagiario.username}</td>
                    <td className="especial">
                      {estagiario.email}
                      <span className="icon-container">
                        <BsPencilSquare className="icon-pencil" onClick={() => {setSelectedEstagiarioId(estagiario.id); setShowUpdateModal(true);}} />
                        <BsTrash className="icon-trash" onClick={() => handleDeleteIconClick(estagiario)} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Toast de exclusão de estagiário */}
      <Toast
        onClose={() => setShowDeleteToast(false)}
        show={showDeleteToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "green",
          color:"white"
        }}
      >
        <Toast.Body>Estagiário excluído com sucesso!</Toast.Body>
      </Toast>

      {/* Toast de atualização de dados */}
      <Toast
        onClose={() => setShowUpdateToast(false)}
        show={showUpdateToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "green",
          color:"white"
        }}
      >
        <Toast.Body>{Message}</Toast.Body>
      </Toast>

      {/* Toast de erro */}
      <Toast
        onClose={() => setShowErrorToast(false)}
        show={showErrorToast}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: "red",
          color:"white"
        }}
      >
        <Toast.Body>{errorMessage}</Toast.Body>
      </Toast>

      <ConfirmDeleteModal
        show={showConfirmDeleteModal}
        onHide={handleCloseModal}
        entityName={estagiarioToDelete ? estagiarioToDelete.username : ""}
        onConfirmDelete={() => handleDeleteEstagiario(estagiarioToDelete)}
      />

      {showUpdateModal && (
        <UpdateModal
          show={showUpdateModal}
          onClose={handleCloseModal}
          phrase="O que gostaria de atualizar do estagiário?"
          options={["Email", "Nome de usuário"]}
          placeholder="Digite o novo valor aqui"
          onUpdate={handleUpdateData}
        />
      )}
    </div>
  );
}

export default VerEstagiarios;
