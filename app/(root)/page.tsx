import StartupCards, { StartupTypeCard } from "@/components/StartupCards";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams}: { searchParams : Promise<{ query? : string}>} ) {

  const query = (await searchParams).query

  const params = { search: query || null }

  const session = await auth();

  console.log("Session id: ", session?.id)

  // const posts = await client.fetch(STARTUPS_QUERY)
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })

  // console.log(JSON.stringify(posts, null, 2))

  // const posts = [{
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: { _id: 1, name: "Adrian"},
  //   _id: 1,
  //   description: "This is a discription",
  //   image: "https://images.unsplash.com/photo-1622550496013-89e40b3e0e2c?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "Robots",
  //   title: "We Robots"
  // }]
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br/> Connect with Entrepreneurs</h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Notices in Virtual Competitions.
        </p>

      <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          { query ? `Search results for "${query}"`: "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          { posts?.length > 0 ? (
            posts.map((post : StartupTypeCard) => ( <StartupCards key={post?.id} post={post}/>))
          ): (
            <p className="no-results">No Startups Found</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
