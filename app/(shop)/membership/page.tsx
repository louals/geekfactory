'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Crown,
  Star,
  Gift,
  Zap,
  Sparkles,
  TrendingUp,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function MembershipPage() {
  const currentTier = 'Gold';
  const currentPoints = 2450;
  const nextTierPoints = 5000;
  const progressPercentage = (currentPoints / nextTierPoints) * 100;

  const tiers = [
    {
      name: 'Silver',
      icon: Star,
      color: 'from-gray-400 to-gray-600',
      pointsRequired: 0,
      benefits: [
        'Early access to new collections',
        '5% off all purchases',
        'Birthday gift',
        'Free standard shipping',
      ],
    },
    {
      name: 'Gold',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      pointsRequired: 1000,
      benefits: [
        'All Silver benefits',
        '10% off all purchases',
        'Priority customer support',
        'Free express shipping',
        'Exclusive member events',
      ],
      current: true,
    },
    {
      name: 'Platinum',
      icon: Sparkles,
      color: 'from-purple-400 to-pink-600',
      pointsRequired: 5000,
      benefits: [
        'All Gold benefits',
        '15% off all purchases',
        'Personal stylist consultation',
        'Free gift wrapping',
        'VIP access to limited editions',
        'Complimentary jewelry cleaning',
      ],
    },
  ];

  const recentActivity = [
    {
      date: 'Jan 15, 2024',
      description: 'Purchase - Order #1024',
      points: '+129',
    },
    { date: 'Jan 10, 2024', description: 'Product Review', points: '+50' },
    {
      date: 'Dec 28, 2023',
      description: 'Purchase - Order #1023',
      points: '+89',
    },
    { date: 'Dec 20, 2023', description: 'Referral Bonus', points: '+100' },
  ];

  const rewards = [
    {
      title: '$10 Off Your Next Purchase',
      points: 500,
      icon: Gift,
      available: true,
    },
    {
      title: 'Free Jewelry Cleaning Service',
      points: 750,
      icon: Sparkles,
      available: true,
    },
    {
      title: '$25 Off Your Next Purchase',
      points: 1000,
      icon: Gift,
      available: true,
    },
    {
      title: 'Exclusive Design Consultation',
      points: 2000,
      icon: Star,
      available: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-white">
                Membership Rewards
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Earn points and unlock exclusive benefits
              </p>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-yellow-500/20 via-yellow-600/10 to-transparent border border-yellow-500/30 rounded-lg p-8 backdrop-blur-sm"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 border-0 text-white mb-3">
                  <Crown className="w-3 h-3 mr-1" />
                  {currentTier} Member
                </Badge>
                <h2 className="text-3xl font-serif font-bold text-white">
                  {currentPoints.toLocaleString()} Points
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  {(nextTierPoints - currentPoints).toLocaleString()} points to
                  Platinum
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white mb-1">
                  {Math.round(progressPercentage)}%
                </div>
                <p className="text-white/60 text-sm">to next tier</p>
              </div>
            </div>

            <div className="space-y-2">
              <Progress
                value={progressPercentage}
                className="h-3 bg-white/10"
              />
              <div className="flex justify-between text-xs text-white/60">
                <span>Gold ({currentPoints})</span>
                <span>Platinum ({nextTierPoints})</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Membership Tiers */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-white">
            Membership Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white/5 border ${
                    tier.current
                      ? 'border-yellow-500/50 ring-2 ring-yellow-500/20'
                      : 'border-white/10'
                  } rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-all`}
                >
                  {tier.current && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 border-0 text-white">
                        Current Tier
                      </Badge>
                    </div>
                  )}

                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    {tier.pointsRequired === 0
                      ? 'Starting tier'
                      : `${tier.pointsRequired.toLocaleString()} points required`}
                  </p>

                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-white/70 text-sm"
                      >
                        <Check className="w-4 h-4 text-bismuth-cyan mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Rewards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
              <Gift className="w-6 h-6 text-bismuth-magenta" />
              Available Rewards
            </h2>
            <div className="space-y-3">
              {rewards.map((reward, index) => {
                const Icon = reward.icon;
                const canRedeem = currentPoints >= reward.points;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-bismuth-magenta to-bismuth-cyan flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">
                            {reward.title}
                          </h3>
                          <p className="text-white/60 text-sm">
                            {reward.points} points
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        disabled={!canRedeem}
                        className={
                          canRedeem
                            ? 'bg-gradient-to-r from-bismuth-cyan to-bismuth-magenta hover:opacity-90 text-white'
                            : 'bg-white/5 text-white/40 cursor-not-allowed'
                        }
                      >
                        {canRedeem ? 'Redeem' : 'Locked'}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-bismuth-cyan" />
              Recent Activity
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm divide-y divide-white/10">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">
                        {activity.description}
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        {activity.date}
                      </p>
                    </div>
                    <div className="text-bismuth-cyan font-bold">
                      {activity.points}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* How to Earn Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            How to Earn Points
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bismuth-cyan to-bismuth-magenta flex items-center justify-center mx-auto mb-3">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-medium mb-2">Make Purchases</h3>
              <p className="text-white/60 text-sm">
                Earn 1 point for every $1 spent
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bismuth-magenta to-bismuth-cyan flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-medium mb-2">Write Reviews</h3>
              <p className="text-white/60 text-sm">
                Get 50 points per product review
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bismuth-cyan to-bismuth-magenta flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-medium mb-2">Refer Friends</h3>
              <p className="text-white/60 text-sm">
                Earn 100 points per referral
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
