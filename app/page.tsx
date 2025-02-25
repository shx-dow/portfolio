"use client"

import { Github, Linkedin, Mail, Code, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { CodeModal } from "@/components/code-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", code: "" })

  const openModal = (title: string, code: string) => {
    setModalContent({ title, code })
    setIsModalOpen(true)
  }

  return (
    <main className="min-h-screen p-8 pt-24 md:p-24 md:pt-32 transition-all-300">
      <section className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold font-poppins bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500 animate-gradient">
            Hi, I'm Chitransh
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80">
            A second-year B.Tech CSE student passionate about technology and innovation.
          </p>
        </div>

        <section id="about" className="space-y-4">
          <h2 className="text-3xl font-semibold font-poppins text-foreground">About Me</h2>
          <p className="text-lg text-foreground/80">
            I'm a curious and dedicated student, always eager to learn and explore new technologies. My journey in
            computer science has just begun, and I'm excited about the endless possibilities ahead.
          </p>
        </section>

        <section id="skills" className="space-y-4">
          <h2 className="text-3xl font-semibold font-poppins text-foreground">Skills & Interests</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Programming",
              "Web Development",
              "Data Structures",
              "Algorithms",
              "Machine Learning",
              "Problem Solving",
            ].map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="text-sm py-1.5 px-3 font-medium transition-all-300 hover:scale-105 
                  dark:bg-[#113366] dark:text-white dark:hover:bg-[#2B888D]
                  bg-[#E8DAD6] text-[#113366] hover:bg-[#BCB6CB] hover:text-[#113366]"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <section id="projects" className="space-y-4">
          <h2 className="text-3xl font-semibold font-poppins text-foreground">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Project cards with hover effects and gradients */}
            <Card className="transition-all-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Weather App</CardTitle>
                <CardDescription className="text-foreground/60">
                  A simple weather application using React and OpenWeatherMap API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  This project demonstrates API integration, state management, and responsive design in React.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="transition-all-300 hover:bg-primary/20 text-primary"
                  onClick={() => openModal("Weather App", "// Weather App code here")}
                >
                  <Code className="mr-2 h-4 w-4" /> View Code
                </Button>
              </CardFooter>
            </Card>
            <Card className="transition-all-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle>Todo List</CardTitle>
                <CardDescription className="text-foreground/60">
                  A simple todo list application using React hooks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  This project showcases state management, component composition, and basic CRUD operations in React.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="transition-all-300 hover:bg-primary/20 text-primary"
                  onClick={() => openModal("Todo List", "// Todo List code here")}
                >
                  <Code className="mr-2 h-4 w-4" /> View Code
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold font-poppins text-foreground">Education</h2>
          <Card className="transition-all-300 hover:shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle>B.Tech in Computer Science and Engineering</CardTitle>
              <CardDescription className="text-foreground/60">
                Your University Name, 2022 - 2026 (Expected)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-foreground/80">
                <li>Relevant coursework: Data Structures, Algorithms, Database Management, etc.</li>
                <li>Current GPA: [Your GPA]</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold font-poppins text-foreground">Achievements</h2>
          <ul className="space-y-2">
            <li className="flex items-center transition-all-300 hover:translate-x-2">
              <Award className="mr-2 h-5 w-5 text-primary" />
              <span className="text-foreground/80">Dean's List - Fall 2022, Spring 2023</span>
            </li>
            <li className="flex items-center transition-all-300 hover:translate-x-2">
              <Award className="mr-2 h-5 w-5 text-primary" />
              <span className="text-foreground/80">1st Place - University Hackathon 2023</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-semibold font-poppins text-foreground">Let's Connect</h2>
          <div className="flex space-x-4">
            <Link
              href="https://github.com"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              <Github size={24} className="transition-all-300 hover:scale-110" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              <Linkedin size={24} className="transition-all-300 hover:scale-110" />
            </Link>
            <Link
              href="mailto:chitransh@example.com"
              className="text-foreground/60 hover:text-foreground transition-colors duration-300"
            >
              <Mail size={24} className="transition-all-300 hover:scale-110" />
            </Link>
          </div>
        </section>
      </section>
      <CodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        code={modalContent.code}
        title={modalContent.title}
      />
    </main>
  )
}

