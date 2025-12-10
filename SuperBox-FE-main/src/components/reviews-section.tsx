"use client";

import { motion } from "framer-motion";
import { ChevronDown, Star, ThumbsUp, User } from "lucide-react";
import { useState } from "react";
import { getReviewsForServer } from "@/lib/mock-data";

type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
};

interface ReviewsSectionProps {
  serverName: string;
  averageRating?: number;
  totalReviews?: number;
}

export default function ReviewsSection({
  serverName,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get reviews for this specific server from mock data
  const REVIEWS = getReviewsForServer(serverName);
  
  // Calculate average rating from reviews
  const calculatedAvgRating = REVIEWS.length > 0 
    ? REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length 
    : 0;
  const finalAvgRating = averageRating ?? calculatedAvgRating;
  const finalTotalReviews = totalReviews ?? REVIEWS.length;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    REVIEWS.forEach((review) => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const distribution = getRatingDistribution();
  const sortedReviews = [...REVIEWS].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.helpful - a.helpful;
  });

  if (finalTotalReviews === 0) {
    return (
      <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-12 text-center">
        <Star className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white/95 mb-2">
          No Reviews Yet
        </h3>
        <p className="text-gray-400">Be the first to review {serverName}!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-white/10 rounded-2xl bg-white/[0.02] p-6"
      >
        <h3 className="text-2xl font-bold text-white/95 mb-6">
          Reviews & Ratings
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-bold text-white/95 mb-3">
              {finalAvgRating.toFixed(1)}
            </div>
            {renderStars(Math.round(finalAvgRating))}
            <p className="text-sm text-gray-400 mt-3">
              {finalTotalReviews} {finalTotalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = distribution[rating as keyof typeof distribution];
              const percentage =
                finalTotalReviews > 0 ? (count / finalTotalReviews) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-16">
                    <span className="text-sm text-gray-300 font-medium">
                      {rating}
                    </span>
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12 text-right font-medium">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-white/10 rounded-2xl bg-white/[0.02] p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-white/95">
            User Reviews ({finalTotalReviews})
          </h4>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-all"
            >
              <span>
                {sortBy === "recent" ? "Most Recent" : "Most Helpful"}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-black/95 border border-white/10 rounded-xl overflow-hidden shadow-xl z-10 backdrop-blur-xl"
              >
                <button
                  onClick={() => {
                    setSortBy("recent");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    sortBy === "recent"
                      ? "bg-[var(--brand-red)]/15 text-[var(--brand-red)] font-medium"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  Most Recent
                </button>
                <button
                  onClick={() => {
                    setSortBy("helpful");
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    sortBy === "helpful"
                      ? "bg-[var(--brand-red)]/15 text-[var(--brand-red)] font-medium"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  Most Helpful
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {sortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-white/10 rounded-xl p-5 bg-white/[0.01] hover:bg-white/[0.03] transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-white/95">
                      {review.author}
                    </p>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {review.comment}
              </p>

              <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-[var(--brand-red)] transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
