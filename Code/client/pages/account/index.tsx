import type { NextPage } from 'next'
import Link from 'next/link';
import React from 'react';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import Loader from '../../components/Loader';

const AccountPage: NextPage = () => {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full md:w-3/4 lg:w-3/5">

          <div className="">
            <h2 className="text-xl font-bold">Account Information</h2>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Personal</h3>
              {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.name}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Username</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.preferred_username as string || user?.nickname || '-'}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.email}
                    {
                      user?.email_verified ? 
                      <CheckCircleIcon className="ml-2 inline h-6 w-6 text-success" aria-hidden="true" />
                      : <XCircleIcon className="ml-2 inline h-6 w-6 text-warning" aria-hidden="true" />
                    }
                    </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.phone_number as string || ''}
                    {
                      user?.phone_number_verified ? 
                      <CheckCircleIcon className="ml-2 inline h-6 w-6 text-success" aria-hidden="true" />
                      : <XCircleIcon className="ml-2 inline h-6 w-6 text-warning" aria-hidden="true" />
                    }
                    </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* <div className="mt-5">
            <div className="btn btn-block btn-outline btn-primary">
              <Link href="/account/edit">Edit</Link>
            </div>
          </div> */}
        </div>
      </div>

    </>
  )
}

export default AccountPage

export const getServerSideProps = withPageAuthRequired();
