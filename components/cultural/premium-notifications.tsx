"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, Truck, Bell, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "success" | "error" | "info" | "order" | "deal" | "restock" | "cultural"
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id }

    setNotifications((prev) => [...prev, newNotification])

    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface NotificationItemProps {
  notification: Notification
  onRemove: () => void
}

function NotificationItem({ notification, onRemove }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      case "order":
        return <Truck className="w-5 h-5 text-orange-600" />
      case "deal":
        return <Gift className="w-5 h-5 text-purple-600" />
      case "restock":
        return <Bell className="w-5 h-5 text-teal-600" />
      case "cultural":
        return <div className="w-5 h-5 text-orange-600">🪷</div>
      default:
        return <Info className="w-5 h-5 text-gray-600" />
    }
  }

  const getColors = () => {
    switch (notification.type) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      case "order":
        return "border-orange-200 bg-orange-50"
      case "deal":
        return "border-purple-200 bg-purple-50"
      case "restock":
        return "border-teal-200 bg-teal-50"
      case "cultural":
        return "border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn("relative overflow-hidden rounded-lg border-2 p-4 shadow-lg backdrop-blur-md", getColors())}
      style={{
        background:
          notification.type === "cultural"
            ? "linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)"
            : undefined,
      }}
    >
      {/* Cultural Pattern Overlay for Cultural Notifications */}
      {notification.type === "cultural" && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/indian-mandala-pattern.png')] bg-repeat bg-center" />
        </div>
      )}

      {/* Traditional Scroll Unfurling Animation */}
      <motion.div
        className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-orange-500 to-red-600"
        initial={{ height: 0 }}
        animate={{ height: "100%" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      <div className="relative z-10 flex items-start space-x-3">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          {getIcon()}
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.h4
            className="text-sm font-semibold text-gray-800 mb-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {notification.title}
          </motion.h4>

          <motion.p
            className="text-sm text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {notification.message}
          </motion.p>

          {notification.action && (
            <motion.button
              onClick={notification.action.onClick}
              className="mt-2 text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {notification.action.label}
            </motion.button>
          )}
        </div>

        <motion.button
          onClick={onRemove}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Traditional Brush Stroke Dismiss Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/50 to-transparent"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
      />
    </motion.div>
  )
}

// Helper hook for common notification patterns
export function useCulturalNotifications() {
  const { addNotification } = useNotifications()

  const showOrderUpdate = (message: string) => {
    addNotification({
      type: "order",
      title: "Order Update",
      message,
      duration: 6000,
    })
  }

  const showCulturalEvent = (title: string, message: string) => {
    addNotification({
      type: "cultural",
      title,
      message,
      duration: 8000,
    })
  }

  const showDeal = (title: string, message: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: "deal",
      title,
      message,
      action,
      duration: 10000,
    })
  }

  const showSuccess = (message: string) => {
    addNotification({
      type: "success",
      title: "Success!",
      message,
      duration: 4000,
    })
  }

  const showError = (message: string) => {
    addNotification({
      type: "error",
      title: "Error",
      message,
      duration: 6000,
    })
  }

  return {
    showOrderUpdate,
    showCulturalEvent,
    showDeal,
    showSuccess,
    showError,
  }
}
