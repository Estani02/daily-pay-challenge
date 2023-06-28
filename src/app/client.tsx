'use client'

import { useState } from 'react'
import { type Nominee, type Ballot } from '../types'
import Image from 'next/image'

interface Props {
  ballots: Ballot[]
}

export const BallotClientPage = ({ ballots }: Props) => {
  // new Map es una estructura de datos que permite almacenar datos en pares clave-valor. En este caso, la clave es el título de la votación y el valor es el nominado elegido.
  const [votes, setVotes] = useState(() => new Map<Ballot['title'], Nominee>())

  // votes es un mapa que almacena los votos de cada votación. Si el tamaño del mapa es igual al número de votaciones, significa que se han votado todas las votaciones.
  const isVotingComplet = votes.size === ballots.length

  // otra forma de escribir la línea anterior es:
  // const isVotingComplet = useMemo(() => votes.size === ballots.length, [votes.size, ballots.length])
  // useMemo es una función que permite memorizar el resultado de una función. En este caso, memoriza el resultado de la función votes.size === ballots.length. Si votes.size o ballots.length cambian, se vuelve a ejecutar la función.

  function handleVote(ballotTitle: Ballot['title'], nominee: Nominee) {
    // structuredClone es una función que clona un objeto. En este caso, clona el mapa de votos.
    const draft = structuredClone(votes)

    draft.set(ballotTitle, nominee)

    setVotes(draft)
  }

  function handleSubmit() {
    alert(Array.from(votes.entries())
      .map(([ballotTitle, nominee]) => `${ballotTitle}: ${nominee.title}`)
      .join('\n'))
  }

  return (
    <article className='flex flex-col gap-12'>
      <div className='grid 2xl:grid-cols-2 mb-16'>
        {ballots.map((ballot) => (
          <section className='flex flex-col items-center justify-center' key={ballot.id}>
            <h2 className='text-2xl font-semibold mt-8'>{ballot.title}</h2>
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-[#581e44] max-w-md md:max-w-2xl w-full p-5 rounded-xl'>
              {ballot.items.map((nominee) => (
                <li className={`flex flex-col items-center justify-between gap-4 bg-[#c5485a] p-3 rounded-xl ${votes.get(ballot.title)?.id === nominee.id ? 'border-solid border-[#edf024] border-[4px]' : ''}`} key={nominee.id}>
                  <span className='font-semibold text-center'>{nominee.title}</span>
                  <Image src={nominee.photoUrL} alt={nominee.title} width={120} height={120} className='rounded-full h-[120px] w-[120px] object-cover' />
                  <button className='bg-[#e0ffcc] hover:bg-[#b6dc9d] font-bold text-[#171133] w-fit text-sm px-5 rounded-lg' onClick={() => { handleVote(ballot.title, nominee) }}>Vote</button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <button className='fixed bottom-0 left-0 right-0 font-bold py-2 px-5 text-white bg-[#3cd117dd] hover:bg-[#3cd11771] transition-colors duration-300 w-fit m-auto mb-5 rounded-3xl disabled:bg-[#4f6749dd] disabled:text-[#a19a9a]' disabled={!isVotingComplet} onClick={handleSubmit}>Submit Votes</button>
    </article>
  )
}
