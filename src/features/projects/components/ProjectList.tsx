'use client'

import { useState } from 'react'
import { useProjects } from '../hooks/useProjects'
import { CreateProjectModal } from './CreateProjectModal'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { DeleteProjectModal } from './DeleteProjectModal'

interface ProjectListProps {
  teamId?: string
}

export function ProjectList({ teamId }: ProjectListProps) {
  const { projects, loading } = useProjects(teamId)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  if (loading) {
    return <div>Loading projects...</div>
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary inline-flex items-center gap-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          New Project
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <button
                onClick={(ev) => {
                  ev.stopPropagation()
                  ev.preventDefault()
                  setSelectedProjectId(project.id)
                  setIsDeleteModalOpen(true)
                }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 flex-1 text-sm text-gray-500 dark:text-gray-400">
              {project.description}
            </p>

            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{project.taskIds.length} tasks</span>
                <span>
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        teamId={teamId}
      />
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        projectId={selectedProjectId!}
      />
    </div>
  )
}
