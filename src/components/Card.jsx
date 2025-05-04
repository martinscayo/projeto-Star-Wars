import { useState, useEffect } from 'react'
import api from '../service/api.js'

function Card() {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const limit = 10

  const fetchData = async (currentPage = 1) => {
    setLoading(true)
    try {
      const response = await api.get(`people?page=${currentPage}&limit=${limit}`)
      const results = response.data.results
      const total = response.data.total_records

      setTotalPages(Math.ceil(total / limit))

      const detailedCharacters = await Promise.all(
        results.map(async (character) => {
          try {
            const res = await api.get(`people/${character.uid}`)
            return res.data.result.properties
          } catch (err) {
            console.error(`Erro ao buscar detalhes de ${character.name}:`, err)
            return null
          }
        })
      )

      const validCharacters = detailedCharacters.filter((char) => char !== null)
      setCharacters(validCharacters)
    } catch (error) {
      console.error('Erro ao buscar personagens:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const displayedCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm)
  )

  return (
    <div className="card-wrapper">
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Buscar personagem..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '8px', width: '250px', fontSize: '16px' }}
        />
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Carregando...</p>
      ) : (
        <>
          <div className="card-container">
            {displayedCharacters.length === 0 ? (
              <p style={{ textAlign: 'center' }}>Nenhum personagem encontrado.</p>
            ) : (
              displayedCharacters.map((person) => (
                <div className="card" key={person.name}>
                  <h2>{person.name}</h2>
                  <p><strong>Altura:</strong> {person.height} cm</p>
                  <p><strong>Massa:</strong> {person.mass} kg</p>
                  <p><strong>Cor dos olhos:</strong> {person.eye_color}</p>
                  <p><strong>Cor do cabelo:</strong> {person.hair_color}</p>
                  <p><strong>Gênero:</strong> {person.gender}</p>
                  <p><strong>Ano de nascimento:</strong> {person.birth_year}</p>
                </div>
              ))
            )}
          </div>

          <div className="pagination">
            <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1 || loading}>
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button onClick={() => setPage((prev) => prev + 1)} disabled={page === totalPages || loading}>
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Card
