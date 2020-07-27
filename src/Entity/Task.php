<?php

namespace App\Entity;

use App\Repository\TaskRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TaskRepository::class)
 * @ORM\HasLifecycleCallbacks()
 */
class Task
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"get:projects"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"get:projects"})
     */
    private $title;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity=TaskStatus::class, inversedBy="tasks")
     * @Groups({"get:projects"})
     */
    private $taskStatus;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="tasks")
     * @Groups({"get:projects"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Project::class, inversedBy="tasks")
     */
    private $project;

    /**
     * @ORM\OneToMany(targetEntity=ChecklistItem::class, mappedBy="task")
     */
    private $checklistItems;

    public function __construct()
    {
        $this->checklistItems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(?\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getTaskStatus(): ?TaskStatus
    {
        return $this->taskStatus;
    }

    public function setTaskStatus(?TaskStatus $taskStatus): self
    {
        $this->taskStatus = $taskStatus;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function __toString()
    {
        return $this->title;
    }

    /** 
     * @ORM\PrePersist
     */
    public function generateCreatedAt()
    {
        $this->createdAt = new \DateTime();
    }

    /** 
     * @ORM\PreUpdate
     */
    public function generateUpdatedAt()
    {
        $this->updatedAt = new \DateTime();
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): self
    {
        $this->project = $project;

        return $this;
    }

    /**
     * @return Collection|ChecklistItem[]
     */
    public function getChecklistItems(): Collection
    {
        return $this->checklistItems;
    }

    public function addChecklistItem(ChecklistItem $checklistItem): self
    {
        if (!$this->checklistItems->contains($checklistItem)) {
            $this->checklistItems[] = $checklistItem;
            $checklistItem->setTask($this);
        }

        return $this;
    }

    public function removeChecklistItem(ChecklistItem $checklistItem): self
    {
        if ($this->checklistItems->contains($checklistItem)) {
            $this->checklistItems->removeElement($checklistItem);
            // set the owning side to null (unless already changed)
            if ($checklistItem->getTask() === $this) {
                $checklistItem->setTask(null);
            }
        }

        return $this;
    }
}
