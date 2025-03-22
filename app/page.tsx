"use client"

import { Github, Linkedin, Mail, Code, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { CodeModal } from "@/components/code-modal"
import { GlowingSection, GlowProvider } from "@/components/GlowingSection"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", code: "" })

  const openModal = (title: string, code: string) => {
    setModalContent({ title, code })
    setIsModalOpen(true)
  }

  return (
    <main className="container mx-auto px-4 py-16 space-y-16">
      {/* About Section */}
      <GlowProvider
        glowSize={300}
        glowOpacity={0.05}
        glowColor="17, 51, 102"
        falloffPercentage={60}
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500 animate-gradient" >
          Hi, I'm Chitransh
        </h1>
        <GlowingSection className="p-8">
          <section id="about">
            <div className="space-y-8">

            </div>

            <section id="about" className="space-y-4">
              <h2 className="text-2xl font-semibold font-heading text-foreground">About Me</h2>
              <p className="text-lg text-foreground/80">
                Hey! I'm a 2nd-year B.Tech (CSE) student who's super into all the techy and cody things happening around the world. Whether it's AI, web dev, or just messing around with cool new tech, I love exploring and learning.
                When I'm not coding, you'll probably find me messing up with cricket or vibing to some music. Let's build something awesome!
              </p>
            </section>
          </section>
        </GlowingSection>

        {/* Skills Section */}
        <GlowingSection className="p-8">
          <section id="skills">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold font-heading text-foreground">Skills & Interests</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "C++",
                  "UI/UX Design",
                  "Vibe Coding",
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
            </div>
          </section>
        </GlowingSection>

        {/* Projects Section */}
        <GlowingSection className="p-8">
          <section id="projects">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold font-heading text-foreground">Projects</h2>
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
            </div>
          </section>
        </GlowingSection>

        {/* Education Section */}
        <GlowingSection className="p-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-heading text-foreground">Education</h2>
            <Card className="transition-all-300 hover:shadow-lg bg-gradient-to-br from-card to-card/50">
              <CardHeader>
                <CardTitle className="text-xl font-normal">B.Tech in Computer Science and Engineering</CardTitle>
                <CardDescription className="text-foreground/60">
                  IU Jaipur, 2023 - 2027 (Expected)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-foreground/80">
                  <li>Relevant coursework: Data Structures, Algorithms, Database Management, etc.</li>
                  <li>Current GPA: 8.5</li>
                </ul>
              </CardContent>
            </Card>
          </section>
        </GlowingSection>

        {/* Achievements Section */}
        <GlowingSection className="p-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-heading text-foreground">Achievements</h2>
            <ul className="space-y-2">
              <li className="flex items-center transition-all-300 hover:translate-x-2">
                <Award className="mr-2 h-5 w-5 text-primary" />
                <span className="text-foreground/80">1st Place - Codera(Coding Competition)</span>
              </li>
              <li className="flex items-center transition-all-300 hover:translate-x-2">
                <Award className="mr-2 h-5 w-5 text-primary" />
                <span className="text-foreground/80">1st Place - Internal Hackathon 2024</span>
              </li>
            </ul>
          </section>
        </GlowingSection>

        {/* Connect Section */}
        <GlowingSection className="p-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-heading text-foreground">Let's Connect</h2>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/shx-dow"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Github size={24} className="transition-all-300 hover:scale-110" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/chitransh-sharma-130313308/"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Linkedin size={24} className="transition-all-300 hover:scale-110" />
              </Link>
              <Link
                href="mailto:chits.official7@gmail.com"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <Mail size={24} className="transition-all-300 hover:scale-110" />
              </Link>
            </div>
          </section>
        </GlowingSection>

        <CodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          code={modalContent.code}
          title={modalContent.title}
        />
      </GlowProvider>
    </main>
  )
}

