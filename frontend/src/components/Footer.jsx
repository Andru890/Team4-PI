import { Link } from 'react-router-dom';

import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="grid gap-1">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Pages</h3>
          <Link href="#">Home</Link>
          <Link href="#">About</Link>
          <Link href="#">Services</Link>
          <Link href="#">Contact</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Resources</h3>
          <Link href="#">Blog</Link>
          <Link href="#">Documentation</Link>
          <Link href="#">Support</Link>
          <Link href="#">FAQ</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <form className="flex space-x-2">
            <Input
              className="flex-1"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Stay up to date with our latest news and updates.
          </p>
        </div>
      </div>
    </footer>
  );
}
