import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <p>Could not find loan</p>
      <p>Make sure that you are accessing a valid loan</p>
      <Button asChild>
        <Link href='/dashboard'>
          Back to Dashboard
        </Link>
      </Button>
    </div>
  )
}