import Link from "next/link";

import Footer from "./components/footer";
import { FiTwitter } from "react-icons/fi";

export default function Custom404() {
  return (
    <main className='h-[calc(100vh-107px)] flex flex-col justify-between lg:max-w-5xl lg:mx-auto'>
      <section className='px-3 py-6 mb-6 md:px-20'>
        <div>
          <h1 className='text-4xl font-bold text-center px-2 py-2 leading-10 md:text-4xl md:max-w-lg mx-auto lg:max-w-4xl lg:text-6xl lg:pt-14 '>
            Frequently Asked Questions
          </h1>
          <p className='pt-8 px-2 py-8 max-w-sm mx-auto text-center text-gray-800 font-Montserrat font-bold leading-7 text-lg md:text-xl md:max-w-md lg:max-w-4xl lg:text-2xl lg:px-40'>
            If you can't find an answer that you're looking for, hit me up on
            twitter @elonsdev
          </p>

          <div className=' mx-2 font-CircularMedium bg-yellow-400 rounded-full text-lg  py-3  cursor-pointer'>
            <div className='flex items-center justify-center'>
              <FiTwitter className='mr-2 text-lg' />
              <Link href='https://twitter.com/elonsdev'>
                <div className='text-center'>@elonsdev</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className='lg:max-w-4xl lg:mx-auto'>
        <div className='mx-6'>
          <h1 className='mt-8 mb-2 text-gray-900 font-bold text-xl'>
            When 🍕?
          </h1>
          <p className='text-gray-800'>
            Get me pizza is built out of a personal need to allow my followers
            to support me with small amounts of crypto in a more meaninful way
            then just asking to gib moneys. Then I thought... Hey, maybe
            artists, influencers, and other creators could use this too.
          </p>
          <h1 className='mt-8 mb-2 text-gray-800 font-bold text-xl'>Why 🍕?</h1>
          <p className='text-gray-800'>
            Short answer: Who doesn't like Pizza? Without pizza we would have no
            Bitcorns...
            <br />
            <br /> Longer answer: I thought it would be fun to allow supporters
            to tip in pizza slice value instead of dollars and mints the
            supporter an NFT that shows their support for the creator. I want to
            expand the idea into token gating posts and content and allow web3
            creators to untap their full value creation.
          </p>
          <h1 className='mt-8 mb-2 text-gray-800 font-bold text-xl'>
            How do I get paid in 🍕?
          </h1>
          <p className='text-gray-800'>
            Every time a supporter tips you a slice they get an NFT proving
            their support and the crypto goes into a smart contract mapped to
            your ETH address. You can withdraw these funds anytime from your
            dashboard or directly from the smart contract. You don't actually
            get pizza, but you could buy yourself one, or anything else, once
            you withdraw your funds.
          </p>
          <h1 className='mt-8 mb-2 text-gray-800 font-bold text-xl'>
            How can my fans pay?
          </h1>
          <p className='text-gray-800'>
            Currently support is available to a wide range of blockchains thanks
            to Axelar, the multichain messaging protocol, namely: ETH, BSC,
            POLYGON, SOL, AVAX... more coming soon.
          </p>
          <h1 className='mt-8 mb-2 text-gray-800 font-bold text-xl'>
            Is there a fee?
          </h1>
          <p className='text-gray-800'>
            It is completely free to sign up and create posts. The smart
            contract takes 5% on every tip to pay for developement and servers.
          </p>
          <h1 className='mt-8 mb-2 text-gray-800 font-bold text-xl'>
            Is it safe to connect a wallet to this site?
          </h1>
          <p className='text-gray-800'>
            GetMe.Pizza uses the latest Moralis v2 SDK, Firebase, and Open
            Zeppelin smart contract libraries to ensure everything is safe and
            secure.
          </p>
          <h1 className='mt-8 mb-2 text-gray-800 font-bold text-xl'>
            What about my data?
          </h1>
          <p className='text-gray-800'>
            This website doesn't track ad data or serve ads and tips are clearly
            visible on the blockchain. Your posts are stored in a secure
            Firebase storage which can be retrieved on request.
          </p>
          <h1 className='mt-8 mb-2 text-gray-800 font-bold text-xl'>
            Hows this site different?
          </h1>
          <p className='text-gray-800'>
            GetMe.Pizza is focused on web3 and can innovate faster than the web2
            competitors as well as build tools that directly unlock web3
            creators specific value and solve some of web3 pain points.
          </p>
          <h1 className='mt-8 mb-2 text-gray-800 font-bold text-xl'>
            Who's running this?
          </h1>
          <p className='text-gray-800'>
            Just me at the moment,{" "}
            <Link href='https://twitter.com/elonsdev'>
              <a className='hover:text-orange-600'>@elonsdev</a>
            </Link>
            . Wanna help out or fork the project? Get hold of me on
            <Link href='https://twitter.com/elonsdev'>
              <a className='hover:text-orange-600'> twitter </a>
            </Link>
            or grab the code on
            <Link href='https://github.com/elonsdev/getmepizza-dapp'>
              <a className='hover:text-orange-600'> GitHub</a>
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
