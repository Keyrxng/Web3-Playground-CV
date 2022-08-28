import { Link } from '@mui/material'
import React from 'react'
import clsx from 'clsx'
import Actions from './Actions'
import GithubIcon from '@mui/icons-material/GitHub'
import { Icon } from '@iconify/react'

function ListItem({ url, children, description, icon, iconColor, title }) {
  return (
    <li className="bg-gray-200 bg-opacity-75 backdrop-filter backdrop-blur-sm border border-gray-100 rounded-lg transition ease-in-out duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 sm:px-6">
        {icon &&
          (typeof icon === 'string' ? (
            <div
              className={clsx(
                'flex flex-shrink-0 items-center justify-center w-12 h-12 rounded-full',
                iconColor === undefined && 'bg-primary-500',
              )}
              style={{
                backgroundColor:
                  iconColor !== undefined ? iconColor : undefined,
              }}
            >
              <Icon className="w-6 h-6 text-white" icon={icon} />
            </div>
          ) : (
            <>{icon}</>
          ))}
        <div className="min-w-0 flex-1 px-4">
          <h1 className="text-gray-700 text-lg font-bold">{title}</h1>
          {description && (
            <p className="flex items-center mt-1 text-gray-500 dark:text-gray-400 text-xs">
              {description}
            </p>
          )}
        </div>
        {url && (
          <div className="inline-flex items-center justify-end space-x-2 w-full sm:w-auto mt-4 sm:mt-1">
            <Link href={url} passhref="true">
              <Actions as="a" aria-label={url}>
                <span className="sr-only">{url}</span>
                <Icon className="mt-1" />
                <GithubIcon />
              </Actions>
            </Link>
          </div>
        )}
      </div>
      {children}
    </li>
  )
}

export default ListItem
