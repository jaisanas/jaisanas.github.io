import { Link } from 'react-router-dom'
import { getBlogPagePath, getTotalBlogPages } from '../data/blogs'

interface BlogPaginationProps {
  currentPage: number
}

export function BlogPagination({ currentPage }: BlogPaginationProps) {
  const totalPages = getTotalBlogPages()

  if (totalPages <= 1) return null

  return (
    <nav className="blog-pagination" aria-label="Blog pagination">
      <Link
        to={getBlogPagePath(currentPage - 1)}
        className={`btn btn-ghost pagination-btn ${currentPage <= 1 ? 'pagination-btn--disabled' : ''}`}
        aria-disabled={currentPage <= 1}
        onClick={(e) => currentPage <= 1 && e.preventDefault()}
      >
        ← Newer posts
      </Link>
      <span className="pagination-status">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        to={getBlogPagePath(currentPage + 1)}
        className={`btn btn-ghost pagination-btn ${currentPage >= totalPages ? 'pagination-btn--disabled' : ''}`}
        aria-disabled={currentPage >= totalPages}
        onClick={(e) => currentPage >= totalPages && e.preventDefault()}
      >
        Older posts →
      </Link>
    </nav>
  )
}
