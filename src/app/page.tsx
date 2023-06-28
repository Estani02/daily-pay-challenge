import api from '../api'
import { BallotClientPage } from './client'

export default async function Home() {
  const ballots = await api.ballot.list()

  return (
    <main className="flex flex-col">
      <h1 className="text-4xl font-bold mt-5">Movie Awards 2021</h1>
      <BallotClientPage ballots={ballots} />
    </main>
  )
}
