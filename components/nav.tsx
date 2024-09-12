'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { BuiltInProviderType } from 'next-auth/providers/index'

const Nav = () => {
  const isUserLoggedIn = true

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  const onSignOutClicked = () => {
    signOut({})
  }

  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setProvidersFunc()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href="/">
        <Image alt="AI prompts logo" src="/assets/images/logo.svg" width="30" height="30" />
        <p className="logo_text">AI prompts</p>
      </Link>

      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={onSignOutClicked} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                alt="profile"
                src="/assets/images/logo.svg"
                width="37"
                height="37"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider.id)}
                  type="button"
                  key={provider.name}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image
              alt="profile"
              src="/assets/images/logo.svg"
              width="37"
              height="37"
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  onClick={() => signIn(provider.id)}
                  type="button"
                  key={provider.name}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
