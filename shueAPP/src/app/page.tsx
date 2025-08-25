import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ItemCard } from "@/components/item-card"
import { SellerCard } from "@/components/seller-card"
import { getHomeSectionsWithRealData, formatPrice, getTimeRemaining } from "@/lib/data"
import { ArrowRight, Clock, Users, Gavel, Ticket, Package } from "lucide-react"

export default async function Home() {
  const sections = await getHomeSectionsWithRealData()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          The Ultimate Sneaker Marketplace
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Buy, sell, and trade authentic sneakers with confidence. Join thousands of sneakerheads worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/explore">
              Explore Sneakers <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sellers/dashboard">Start Selling</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Button variant="ghost" asChild>
            <Link href="/explore">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sections.featuredProducts.map((product) => (
            <ItemCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Sellers */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Top Sellers</h2>
          <Button variant="ghost" asChild>
            <Link href="/explore">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.topSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      </section>

      {/* Active Auctions */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gavel className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Live Auctions</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/explore">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.activeAuctions.map((auction) => (
            <Card key={auction.id} className="cursor-pointer hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Auction #{auction.id}</CardTitle>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{getTimeRemaining(auction.endDate)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">Size {auction.size}</div>
                <div className="space-y-1">
                  <div className="text-lg font-bold">{formatPrice(auction.currentBid)}</div>
                  <div className="text-xs text-muted-foreground">
                    {auction.bidCount} bids • {auction.watchers} watching
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Active Raffles */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Ticket className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Active Raffles</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/explore">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.activeRaffles.map((raffle) => (
            <Card key={raffle.id} className="cursor-pointer hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{raffle.productName}</CardTitle>
                <div className="text-sm text-muted-foreground">{raffle.brand}</div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Entry Price:</span>
                  <span className="font-bold">{formatPrice(raffle.entryPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Entries:</span>
                  <span className="text-sm">{raffle.totalEntries}/{raffle.maxEntries}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(raffle.totalEntries / raffle.maxEntries) * 100}%` }}
                  />
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Ends {getTimeRemaining(raffle.endDate)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* New Preorders */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <h2 className="text-3xl font-bold">New Preorders</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/explore">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.newPreorders.map((preorder) => (
            <Card key={preorder.id} className="cursor-pointer hover:shadow-lg transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm line-clamp-2">{preorder.productName}</CardTitle>
                <div className="text-xs text-muted-foreground">{preorder.brand}</div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs">Retail:</span>
                    <span className="text-xs line-through text-muted-foreground">
                      {formatPrice(preorder.retailPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs">Preorder:</span>
                    <span className="text-sm font-bold">{formatPrice(preorder.preorderPrice)}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {preorder.totalOrders}/{preorder.maxOrders} ordered
                </div>
                <div className="text-xs text-muted-foreground">
                  Ships: {new Date(preorder.shippingDate).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Requests */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <h2 className="text-3xl font-bold">Recent Requests</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/requests">
              See all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.recentRequests.map((request) => (
            <Card key={request.id} className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold line-clamp-1">{request.productName}</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size {request.size}</span>
                    <span className="font-bold">{formatPrice(request.maxPrice)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    by {request.requesterName} • {request.location}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {request.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
